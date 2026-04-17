import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';

interface ExecuteResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
  hasTimedOut?: boolean;
  isBlocked?: boolean;
  imageBase64?: string;
}

// 检查并安装必要的依赖
async function ensureDependencies(): Promise<boolean> {
  return new Promise((resolve) => {
    // 先检查numpy是否已安装
    const checkProcess = spawn('python3', ['-c', 'import numpy; import pandas; import matplotlib; print("OK")']);
    
    checkProcess.on('close', (code) => {
      if (code === 0) {
        resolve(true);
      } else {
        // 安装必要的库
        const installProcess = spawn('pip3', ['install', '-q', 'numpy', 'pandas', 'matplotlib', 'scipy', 'scikit-learn']);
        installProcess.on('close', (installCode) => {
          resolve(installCode === 0);
        });
        installProcess.on('error', () => {
          resolve(false);
        });
      }
    });
    
    checkProcess.on('error', () => {
      resolve(false);
    });
  });
}

export async function POST(request: NextRequest): Promise<NextResponse<ExecuteResult>> {
  try {
    const { code, timeout = 15 } = await request.json();

    if (!code) {
      return NextResponse.json(
        { success: false, output: '', error: '缺少代码内容', executionTime: 0 },
        { status: 400 }
      );
    }

    // 安全检查：限制代码长度
    if (code.length > 5000) {
      return NextResponse.json(
        { success: false, output: '', error: '代码过长，请控制在5000字符以内', executionTime: 0 },
        { status: 400 }
      );
    }

    // 安全检查：禁用危险操作
    const dangerousPatterns = [
      'import os',
      'import sys',
      'import subprocess',
      'import socket',
      'open(',
      'eval(',
      'exec(',
      '__import__',
      'os.system',
      'os.popen',
      'subprocess.run',
      'subprocess.call',
    ];

    for (const pattern of dangerousPatterns) {
      if (code.includes(pattern)) {
        return NextResponse.json({
          success: false,
          output: '',
          error: `代码包含禁止的操作: ${pattern}`,
          executionTime: 0,
          isBlocked: true
        });
      }
    }

    // 检查/安装依赖
    const depsInstalled = await ensureDependencies();
    if (!depsInstalled) {
      return NextResponse.json({
        success: false,
        output: '',
        error: 'Python依赖库安装失败，请稍后重试',
        executionTime: 0
      });
    }

    const startTime = Date.now();

    // 使用Python执行代码
    const pythonCode = `
import sys
import io
import traceback
import base64
import os
import tempfile
from io import StringIO

# 设置matplotlib使用非交互式后端
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

# 创建临时目录用于存储图片
temp_dir = tempfile.mkdtemp()
plot_count = 0

# 重定向输出
old_stdout = sys.stdout
old_stderr = sys.stderr
sys.stdout = StringIO()
sys.stderr = StringIO()

# 捕获plt.show()调用 - 替换为保存图片
original_show = plt.show
def capture_show(*args, **kwargs):
    global plot_count
    for fig_num in plt.get_fignums():
        fig = plt.figure(fig_num)
        img_path = os.path.join(temp_dir, f'plot_{plot_count}.png')
        fig.savefig(img_path, format='png', dpi=100, bbox_inches='tight')
        plot_count += 1
    plt.close('all')
    # 不调用原始show
plt.show = capture_show

# 重写ion和ioff以避免交互模式问题
plt.ion = lambda: None
plt.ioff = lambda: None

try:
${code.split('\n').map((line: string) => '    ' + line).join('\n')}
    # 检查是否有未显示的图片
    for fig_num in plt.get_fignums():
        fig = plt.figure(fig_num)
        img_path = os.path.join(temp_dir, f'plot_{plot_count}.png')
        fig.savefig(img_path, format='png', dpi=100, bbox_inches='tight')
        plot_count += 1
    plt.close('all')
    
    stdout_output = sys.stdout.getvalue()
    stderr_output = sys.stderr.getvalue()
    success = True
    error_msg = ''
except Exception as e:
    stdout_output = sys.stdout.getvalue()
    stderr_output = sys.stderr.getvalue()
    error_msg = traceback.format_exc()
    success = False
    plt.close('all')

sys.stdout = old_stdout
sys.stderr = old_stderr

# 收集所有图片的base64编码
image_b64 = ''
if plot_count > 0:
    images = []
    for i in range(plot_count):
        img_path = os.path.join(temp_dir, f'plot_{i}.png')
        if os.path.exists(img_path):
            with open(img_path, 'rb') as f:
                img_data = base64.b64encode(f.read()).decode('utf-8')
                images.append(img_data)
    if images:
        image_b64 = '||IMAGES||'.join(images)

print('__OUTPUT_START__')
print(stdout_output)
print('__OUTPUT_END__')
if not success:
    print('__ERROR_START__')
    print(error_msg)
    print('__ERROR_END__')
print('__IMAGES_START__')
print(image_b64)
print('__IMAGES_END__')

# 清理临时文件
import shutil
shutil.rmtree(temp_dir, ignore_errors=True)
`;

    return await new Promise<NextResponse<ExecuteResult>>((resolve) => {
      const process = spawn('python3', ['-c', pythonCode], {
        timeout: timeout * 1000,
        shell: false
      });

      let output = '';
      let errorOutput = '';
      let hasTimedOut = false;

      process.stdout.on('data', (data) => {
        output += data.toString();
      });

      process.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      process.on('close', (code) => {
        const executionTime = Date.now() - startTime;

        // 解析输出
        let cleanOutput = '';
        let error = '';
        let imageBase64 = '';

        const outputMatch = output.match(/__OUTPUT_START__([\s\S]*?)__OUTPUT_END__/);
        const errorMatch = output.match(/__ERROR_START__([\s\S]*?)__ERROR_END__/);
        const imagesMatch = output.match(/__IMAGES_START__([\s\S]*?)__IMAGES_END__/);

        if (outputMatch) {
          cleanOutput = outputMatch[1].trim();
        }
        if (errorMatch) {
          error = errorMatch[1].trim();
        }
        if (imagesMatch) {
          imageBase64 = imagesMatch[1].trim();
        }

        // 如果有stderr但没有解析出的error
        if (!error && errorOutput) {
          error = errorOutput;
        }

        resolve(NextResponse.json({
          success: code === 0 && !error,
          output: cleanOutput || (code === 0 ? '代码执行完成' : ''),
          error: error,
          executionTime,
          hasTimedOut: hasTimedOut,
          imageBase64: imageBase64 || undefined
        }));
      });

      process.on('error', (err) => {
        resolve(NextResponse.json({
          success: false,
          output: '',
          error: `执行错误: ${err.message}`,
          executionTime: Date.now() - startTime
        }));
      });

      // 超时处理
      setTimeout(() => {
        hasTimedOut = true;
        process.kill();
        resolve(NextResponse.json({
          success: false,
          output: '',
          error: `执行超时（超过${timeout}秒）`,
          executionTime: timeout * 1000,
          hasTimedOut: true
        }));
      }, timeout * 1000);
    });
  } catch (error) {
    console.error('代码执行失败:', error);
    return NextResponse.json({
      success: false,
      output: '',
      error: '代码执行服务暂时不可用',
      executionTime: 0
    }, { status: 500 });
  }
}
