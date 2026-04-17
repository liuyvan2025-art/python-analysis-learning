import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

// 代码讲解系统提示词
const CODE_EXPLANATION_PROMPT = `你是一位Python数据分析专家，帮助用户理解Python代码。你的职责是：
1. 详细解释代码的每一步逻辑
2. 解释关键函数和方法的作用
3. 指出代码中的重要知识点
4. 提供最佳实践建议

请用简洁易懂的语言解释代码，保持专业性同时让初学者能够理解。`;

export async function POST(request: NextRequest) {
  try {
    const { code, language = 'python' } = await request.json();

    if (!code) {
      return NextResponse.json({ error: '缺少代码内容' }, { status: 400 });
    }

    const config = new Config();
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const client = new LLMClient(config, customHeaders);

    const messages = [
      { role: 'system' as const, content: CODE_EXPLANATION_PROMPT },
      { 
        role: 'user' as const, 
        content: `请详细解释以下${language}代码，特别关注其中的数据处理和分析逻辑：\n\n\`\`\`${language}\n${code}\n\`\`\`` 
      }
    ];

    // 使用流式输出
    const stream = client.stream(messages, { 
      model: 'doubao-seed-1-8-251228',
      temperature: 0.7 
    });

    const encoder = new TextEncoder();
    const streamData = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk.content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        } catch (error) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Stream error' })}\n\n`));
        } finally {
          controller.close();
        }
      }
    });

    return new Response(streamData, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('代码讲解失败:', error);
    return NextResponse.json({ error: '代码讲解服务暂时不可用' }, { status: 500 });
  }
}

// 非流式版本（备用）
export async function PUT(request: NextRequest) {
  try {
    const { code, language = 'python' } = await request.json();

    if (!code) {
      return NextResponse.json({ error: '缺少代码内容' }, { status: 400 });
    }

    const config = new Config();
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const client = new LLMClient(config, customHeaders);

    const messages = [
      { role: 'system' as const, content: CODE_EXPLANATION_PROMPT },
      { 
        role: 'user' as const, 
        content: `请详细解释以下${language}代码，特别关注其中的数据处理和分析逻辑：\n\n\`\`\`${language}\n${code}\n\`\`\`` 
      }
    ];

    const response = await client.invoke(messages, { 
      model: 'doubao-seed-1-8-251228',
      temperature: 0.7 
    });

    return NextResponse.json({ success: true, explanation: response.content });
  } catch (error) {
    console.error('代码讲解失败:', error);
    return NextResponse.json({ error: '代码讲解服务暂时不可用' }, { status: 500 });
  }
}
