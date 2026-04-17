'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { learningContent } from '@/lib/learningData';
import { learningContent as allContent } from '@/lib/learningData';
import { PythonExecutionResult } from '@/lib/types';
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Sparkles,
  CheckCircle,
  Loader2,
  Terminal,
  BookOpen,
  Code,
  Clock,
  User
} from 'lucide-react';
import { toast } from 'sonner';

export default function DayLearnPage() {
  const params = useParams();
  const router = useRouter();
  const dayNumber = parseInt(params.day as string);

  const dayContent = allContent
    .flatMap((week) => week.days)
    .find((day) => day.day === dayNumber);

  const [code, setCode] = useState(dayContent?.codeExample || '# 在这里编写代码');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkinNotes, setCheckinNotes] = useState('');
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);

  // 生成简单的用户ID
  const userId = typeof window !== 'undefined' 
    ? localStorage.getItem('python_user_id') || `user_${Date.now()}`
    : '';

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('python_user_id')) {
      localStorage.setItem('python_user_id', `user_${Date.now()}`);
    }
    if (dayContent?.codeExample) {
      setCode(dayContent.codeExample);
    }
  }, [dayContent]);

  // 检查是否已打卡
  useEffect(() => {
    const checkCheckin = async () => {
      if (!userId || !dayNumber) return;
      try {
        const res = await fetch(`/api/checkin?userId=${userId}`);
        const data = await res.json();
        if (data.data) {
          const todayCheckin = data.data.find(
            (c: { day_number: number }) => c.day_number === dayNumber
          );
          setIsCheckedIn(!!todayCheckin);
        }
      } catch (error) {
        console.error('检查打卡失败:', error);
      }
    };
    checkCheckin();
  }, [userId, dayNumber]);

  // 自动滚动到运行结果
  useEffect(() => {
    if (output && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [output]);

  // 自动滚动到图表
  useEffect(() => {
    if (outputImage && imageRef.current) {
      imageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [outputImage]);

  // 自动滚动到AI讲解
  useEffect(() => {
    if (explanation && explanationRef.current) {
      explanationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [explanation]);

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

  const handleCheckin = async () => {
    if (!userId || !dayContent) return;
    
    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          dayNumber: dayContent.day,
          weekNumber: dayContent.week,
          notes: checkinNotes,
          codeSubmitted: code
        })
      });

      if (res.ok) {
        setIsCheckedIn(true);
        toast.success('打卡成功！继续加油！');
      } else {
        toast.error('打卡失败，请重试');
      }
    } catch (error) {
      toast.error('打卡失败: ' + (error as Error).message);
    }
  };

  if (!dayContent) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">未找到该天的学习内容</h2>
        <Link href="/learn">
          <Button>返回学习路线</Button>
        </Link>
      </div>
    );
  }

  const prevDay = dayNumber > 1 ? dayNumber - 1 : null;
  const nextDay = dayNumber < 30 ? dayNumber + 1 : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/learn">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge>第{dayContent.week}周</Badge>
              <Badge variant="outline">Day {dayContent.day}</Badge>
              {isCheckedIn && (
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" /> 已打卡
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold">{dayContent.title}</h1>
          </div>
        </div>
        
        <div className="flex gap-2">
          {prevDay && (
            <Link href={`/learn/${prevDay}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" /> 上一天
              </Button>
            </Link>
          )}
          {nextDay && (
            <Link href={`/learn/${nextDay}`}>
              <Button variant="outline" size="sm">
                下一天 <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Learning Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                核心内容
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dayContent.coreContent.map((content, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                      {index + 1}
                    </span>
                    <span className="text-sm">{content}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                练习任务
              </CardTitle>
              <CardDescription>{dayContent.practiceTask}</CardDescription>
            </CardHeader>
          </Card>

          {dayContent.checkpoints && (
            <Card>
              <CardHeader>
                <CardTitle>学习检查点</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {dayContent.checkpoints.map((checkpoint, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {checkpoint}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Code Runner & Explanation */}
        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  在线代码运行
                </CardTitle>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={runCode}
                    disabled={isRunning}
                    className="gap-1"
                  >
                    {isRunning ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    运行
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={explainCode}
                    disabled={isExplaining}
                    className="gap-1"
                  >
                    {isExplaining ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    讲解
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
                placeholder="在这里编写Python代码..."
              />
              
              <Separator />
              
              <div ref={outputRef}>
                <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                  <Terminal className="h-4 w-4" />
                  运行结果
                </div>
                <pre className="bg-muted rounded-lg p-4 min-h-[100px] text-sm overflow-auto max-h-[200px]">
                  {output || '点击"运行"按钮执行代码'}
                </pre>
              </div>

              {/* 图片展示 */}
              {outputImage && (
                <>
                  <Separator />
                  <div ref={imageRef}>
                    <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                      <Terminal className="h-4 w-4" />
                      可视化图表
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
                  <div ref={explanationRef}>
                    <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                      <Sparkles className="h-4 w-4 text-primary" />
                      AI代码讲解
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-sm whitespace-pre-wrap max-h-[300px] overflow-auto">
                      {explanation}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Checkin */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                每日打卡
              </CardTitle>
              <CardDescription>
                完成今日学习后记录你的学习心得
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={checkinNotes}
                onChange={(e) => setCheckinNotes(e.target.value)}
                placeholder="记录今天的学习心得..."
                className="min-h-[80px]"
              />
              <Button 
                onClick={handleCheckin} 
                disabled={isCheckedIn}
                className="w-full"
              >
                {isCheckedIn ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    今日已打卡
                  </>
                ) : (
                  '确认打卡'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
