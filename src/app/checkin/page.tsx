'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckinRecord, UserProgress } from '@/lib/types';
import { learningContent } from '@/lib/learningData';
import {
  Calendar,
  CheckCircle,
  Clock,
  Flame,
  Trophy,
  ArrowRight,
  Loader2
} from 'lucide-react';

export default function CheckinPage() {
  const [checkins, setCheckins] = useState<CheckinRecord[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = typeof window !== 'undefined' 
    ? localStorage.getItem('python_user_id') || ''
    : '';

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // 获取打卡记录
        const checkinRes = await fetch(`/api/checkin?userId=${userId}`);
        const checkinData = await checkinRes.json();
        if (checkinData.data) {
          setCheckins(checkinData.data);
        }
      } catch (error) {
        console.error('获取打卡数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const completedDays = checkins.length;
  const totalDays = 30;
  const progressPercent = Math.round((completedDays / totalDays) * 100);

  // 获取每周的打卡统计
  const weekStats = learningContent.map((week) => {
    const weekDays = week.days.map((d) => d.day);
    const completedInWeek = checkins.filter((c) => weekDays.includes(c.day_number)).length;
    return {
      week: week.week,
      title: week.title,
      total: weekDays.length,
      completed: completedInWeek,
      percentage: Math.round((completedInWeek / weekDays.length) * 100)
    };
  });

  // 获取连续打卡天数（简单实现）
  const streakDays = checkins.length > 0 ? Math.min(checkins.length, completedDays) : 0;

  if (!userId) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">请先访问学习页面</h2>
        <p className="text-muted-foreground mb-6">
          打卡功能需要在学习页面初始化后使用
        </p>
        <Link href="/learn">
          <Button>前往学习</Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">我的打卡记录</h1>
        <p className="text-muted-foreground">
          坚持学习，记录成长。每一天的努力都是进步
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedDays}</p>
              <p className="text-sm text-muted-foreground">已完成天数</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
              <Flame className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{streakDays}</p>
              <p className="text-sm text-muted-foreground">连续打卡</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <Trophy className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{progressPercent}%</p>
              <p className="text-sm text-muted-foreground">完成进度</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
              <Clock className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalDays - completedDays}</p>
              <p className="text-sm text-muted-foreground">剩余天数</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle>学习进度</CardTitle>
          <CardDescription>
            第 {completedDays} 天 / 共 {totalDays} 天
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercent} className="h-3" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>开始</span>
            <span>完成</span>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle>每周进度</CardTitle>
          <CardDescription>各周学习完成情况</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {weekStats.map((week) => (
            <div key={week.week} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">第{week.week}周</Badge>
                  <span className="font-medium">{week.title}</span>
                </div>
                <span className="text-muted-foreground">
                  {week.completed}/{week.total} 天 ({week.percentage}%)
                </span>
              </div>
              <Progress value={week.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Checkin List */}
      <Card>
        <CardHeader>
          <CardTitle>打卡日历</CardTitle>
          <CardDescription>30天学习打卡记录</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
              const isCompleted = checkins.some((c) => c.day_number === day);
              const checkin = checkins.find((c) => c.day_number === day);
              
              return (
                <Link key={day} href={`/learn/${day}`}>
                  <div
                    className={`aspect-square flex flex-col items-center justify-center rounded-lg border-2 transition-all cursor-pointer hover:scale-105 ${
                      isCompleted
                        ? 'bg-green-500/10 border-green-500 text-green-700'
                        : 'bg-muted/50 border-muted hover:border-primary/50'
                    }`}
                  >
                    <span className="text-xs font-medium">{day}</span>
                    {isCompleted && <CheckCircle className="h-3 w-3 mt-1 text-green-500" />}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500/10 border-2 border-green-500" />
              <span>已完成</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted/50 border-2 border-muted" />
              <span>未完成</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Checkins */}
      {checkins.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>最近打卡</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {checkins
                .slice(-5)
                .reverse()
                .map((checkin) => (
                  <Link key={checkin.id} href={`/learn/${checkin.day_number}`}>
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Day {checkin.day_number}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(checkin.completed_at).toLocaleDateString('zh-CN')}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA */}
      {completedDays < 30 && (
        <div className="text-center">
          <Link href={`/learn/${Math.min(completedDays + 1, 30)}`}>
            <Button size="lg" className="gap-2">
              继续学习 Day {Math.min(completedDays + 1, 30)}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}

      {completedDays === 30 && (
        <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10">
          <CardContent className="text-center py-12">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">恭喜完成学习！</h2>
            <p className="text-muted-foreground mb-6">
              你已完成了30天的Python数据分析学习，继续加油！
            </p>
            <Link href="/learn">
              <Button variant="outline">复习所有内容</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
