'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { PythonExecutionResult } from '@/lib/types';
import {
  Play,
  Loader2,
  Terminal,
  Copy,
  Check,
  Sparkles,
  RotateCcw,
  BookOpen,
  Code
} from 'lucide-react';
import { toast } from 'sonner';

const sampleCode = {
  numpy: `# NumPy 示例：数组操作
import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
print("原始数组:", arr)

# 数组运算
print("加10:", arr + 10)
print("乘2:", arr * 2)
print("平方:", arr ** 2)

# 统计
print("均值:", np.mean(arr))
print("标准差:", np.std(arr))

# 矩阵
matrix = np.random.randint(1, 10, (3, 3))
print("随机矩阵:")
print(matrix)`,
  
  pandas: `# Pandas 示例：数据处理
import pandas as pd

# 创建数据
df = pd.DataFrame({
    '姓名': ['张三', '李四', '王五', '赵六'],
    '年龄': [25, 30, 28, 35],
    '分数': [85, 92, 78, 88]
})
print("数据:")
print(df)
print()

# 统计
print("平均年龄:", df['年龄'].mean())
print("最高分:", df['分数'].max())
print()

# 筛选
print("年龄>27的:")
print(df[df['年龄'] > 27])`,

  matplotlib: `# Matplotlib 示例：三角函数图表
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 2 * np.pi, 100)
y1 = np.sin(x)
y2 = np.cos(x)

plt.figure(figsize=(10, 4))
plt.plot(x, y1, 'b-', label='sin(x)')
plt.plot(x, y2, 'r--', label='cos(x)')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('三角函数图像')
plt.legend()
plt.grid(True)

print("图表已生成！")`,

  statistics: `# 统计示例：假设检验
import numpy as np
from statistics import mean, stdev

# 数据
group_a = [78, 82, 85, 79, 88, 81, 84, 77, 86, 83]
group_b = [85, 89, 92, 87, 95, 90, 88, 86, 91, 94]

print("组A统计:")
print(f"  均值: {mean(group_a):.2f}")
print(f"  标准差: {stdev(group_a):.2f}")

print("\\n组B统计:")
print(f"  均值: {mean(group_b):.2f}")
print(f"  标准差: {stdev(group_b):.2f}")

# 差异分析
diff = mean(group_b) - mean(group_a)
print(f"\\n组B比组A高: {diff:.2f} 分")`
};

export default function PlaygroundPage() {
  const [code, setCode] = useState(sampleCode.numpy);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);
  const [copied, setCopied] = useState(false);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const outputRef = useRef<HTMLPreElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput('');
    setOutputImage(null);
    
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, timeout: 15 })
      });
      
      const result: PythonExecutionResult = await res.json();
      
      if (result.success) {
        setOutput(result.output || '代码执行完成');
        // 如果有图片，显示图片
        if (result.imageBase64) {
          setOutputImage(result.imageBase64);
        }
      } else {
        setOutput(result.error || '执行失败');
      }
    } catch (error) {
      setOutput('执行失败: ' + (error as Error).message);
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  const explainCode = useCallback(async () => {
    setIsExplaining(true);
    setExplanation('');
    
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                setIsExplaining(false);
                return;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  setExplanation((prev) => prev + parsed.content);
                }
                if (parsed.error) {
                  toast.error('代码讲解出错');
                  setIsExplaining(false);
                  return;
                }
              } catch {
                // 忽略解析错误
              }
            }
          }
        }
      }
    } catch (error) {
      toast.error('代码讲解服务暂时不可用');
    } finally {
      setIsExplaining(false);
    }
  }, [code]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('代码已复制');
  };

  const loadSample = (key: keyof typeof sampleCode) => {
    setCode(sampleCode[key]);
    setOutput('');
    setExplanation('');
    toast.success('示例代码已加载');
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">Python 在线代码运行</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          编写、运行Python代码，支持numpy、pandas等常用库。支持AI代码讲解功能
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sample Templates */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-5 w-5 text-primary" />
              示例代码
            </CardTitle>
            <CardDescription>点击加载示例代码</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => loadSample('numpy')}
            >
              <Code className="h-4 w-4 mr-2" />
              NumPy 数组操作
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => loadSample('pandas')}
            >
              <Code className="h-4 w-4 mr-2" />
              Pandas 数据处理
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => loadSample('matplotlib')}
            >
              <Code className="h-4 w-4 mr-2" />
              Matplotlib 绑图
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => loadSample('statistics')}
            >
              <Code className="h-4 w-4 mr-2" />
              统计分析
            </Button>
          </CardContent>
        </Card>

        {/* Code Editor & Output */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle>代码编辑器</CardTitle>
                <CardDescription>支持Python语法高亮</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyCode}
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-1" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1" />
                  )}
                  复制
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCode('# 在这里编写代码');
                    setOutput('');
                    setExplanation('');
                  }}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  清空
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[250px] font-mono text-sm"
              placeholder="在这里编写Python代码..."
            />
            
            <div className="flex gap-2">
              <Button 
                onClick={runCode}
                disabled={isRunning}
                className="gap-2 flex-1"
              >
                {isRunning ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                运行代码
              </Button>
              <Button 
                variant="secondary"
                onClick={explainCode}
                disabled={isExplaining}
                className="gap-2"
              >
                {isExplaining ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                AI讲解
              </Button>
            </div>

            <Separator />

            <div>
              <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                <Terminal className="h-4 w-4" />
                运行结果
                {output && (
                  <Badge variant="outline" className="ml-auto text-xs">
                    已输出
                  </Badge>
                )}
              </div>
              <pre className="bg-muted rounded-lg p-4 min-h-[120px] text-sm overflow-auto max-h-[250px]">
                {output || '点击"运行代码"按钮执行Python代码'}
              </pre>
            </div>

            {/* 图片展示 */}
            {outputImage && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                    <Terminal className="h-4 w-4" />
                    可视化图表
                    <Badge variant="outline" className="ml-auto text-xs">
                      Matplotlib
                    </Badge>
                  </div>
                  <div className="bg-muted rounded-lg p-2 overflow-auto">
                    <img 
                      src={`data:image/png;base64,${outputImage}`} 
                      alt="Matplotlib生成的图表"
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
              </>
            )}

            {explanation && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI代码讲解
                    <Badge variant="outline" className="ml-auto text-xs">
                      智能分析
                    </Badge>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-sm whitespace-pre-wrap max-h-[300px] overflow-auto">
                    {explanation}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 支持 numpy、pandas、matplotlib 等常用数据分析库</li>
            <li>• 代码执行有15秒超时限制</li>
            <li>• 点击"AI讲解"可获得代码的详细解释</li>
            <li>• 建议使用示例代码快速上手</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function EffectHooks({ output, outputImage, explanation }: { output: string; outputImage: string | null; explanation: string }) {
  const outputRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (output && outputRef.current) {
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [output]);

  useEffect(() => {
    if (outputImage && imageRef.current) {
      setTimeout(() => {
        imageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [outputImage]);

  useEffect(() => {
    if (explanation && explanationRef.current) {
      setTimeout(() => {
        explanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [explanation]);

  return (
    <div className="hidden">
      <div ref={outputRef} />
      <div ref={imageRef} />
      <div ref={explanationRef} />
    </div>
  );
}
