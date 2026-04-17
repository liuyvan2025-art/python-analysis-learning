import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { learningGoals, dailySchedule, resources, learningContent } from '@/lib/learningData';
import { Target, Clock, BookOpen, Trophy, ArrowRight, Code, Sparkles, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const totalDays = 30;
  const weeks = learningContent.length;
  const today = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 md:p-12">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">{today}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            30天Python数据分析
            <br />
            <span className="text-primary">科研学习方案</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            从零开始，系统学习Python数据分析技能。本方案专为科研人员设计，
            涵盖数据处理、统计分析、可视化、机器学习等核心技能。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/learn">
              <Button size="lg" className="gap-2">
                开始学习 <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/playground">
              <Button size="lg" variant="outline" className="gap-2">
                <Code className="h-4 w-4" /> 在线练习
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-primary/50 rounded-full blur-2xl" />
        </div>
      </section>

      {/* Learning Goals */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          学习目标
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {learningGoals.map((goal, index) => (
            <Card key={index} className="bg-gradient-to-br from-card to-muted/20">
              <CardContent className="flex items-start gap-3 p-4">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{goal}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Learning Structure */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          学习结构
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningContent.map((week) => (
            <Link href={`/learn?week=${week.week}`} key={week.week}>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary">
                      第{week.week}周
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Day {(week.week - 1) * 7 + 1}-{(week.week - 1) * 7 + 7}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{week.title}</CardTitle>
                  <CardDescription>{week.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {week.days.length}个学习日
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Daily Schedule */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          每日学习建议
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Object.values(dailySchedule).map((schedule, index) => (
            <Card key={index} className="bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    {index + 1}
                  </span>
                  {schedule.time}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{schedule.content}</p>
                <p className="text-sm font-medium text-primary">{schedule.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          推荐学习资源
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📚 经典书籍</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resources.books.map((book, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{book.name}</p>
                    <p className="text-xs text-muted-foreground">{book.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">🎓 在线课程</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resources.courses.map((course, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{course.name}</p>
                    <p className="text-xs text-muted-foreground">{course.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">💻 练习平台</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resources.practice.map((platform, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{platform.name}</p>
                    <p className="text-xs text-muted-foreground">{platform.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">准备好开始学习了吗？</h2>
        <p className="text-muted-foreground mb-6">
          每天坚持学习，30天后你将掌握Python数据分析的核心技能
        </p>
        <Link href="/learn">
          <Button size="lg" className="gap-2">
            立即开始 Day 1 <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
