'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { learningContent } from '@/lib/learningData';
import { Calendar, CheckCircle, BookOpen, ArrowRight } from 'lucide-react';

export default function LearnPage() {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">学习路线</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          30天系统学习，从Python基础到科研实战，循序渐进掌握数据分析技能
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            {learningContent.map((week) => (
              <TabsTrigger key={week.week} value={`week-${week.week}`}>
                第{week.week}周
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {['all', ...learningContent.map((w) => `week-${w.week}`)].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-6">
            {learningContent
              .filter((week) => tabValue === 'all' || tabValue === `week-${week.week}`)
              .map((week) => (
                <Card key={week.week} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          第{week.week}周
                        </Badge>
                        <CardTitle className="text-2xl">{week.title}</CardTitle>
                        <CardDescription className="mt-2">{week.description}</CardDescription>
                      </div>
                      <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Day {(week.week - 1) * 7 + 1} - {(week.week - 1) * 7 + 7}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {week.days.map((day) => (
                        <Link
                          key={day.day}
                          href={`/learn/${day.day}`}
                          className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                            {day.day}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium mb-1">{day.title}</h3>
                            <div className="flex flex-wrap gap-2">
                              {day.coreContent.slice(0, 3).map((content, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {content}
                                </Badge>
                              ))}
                              {day.coreContent.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{day.coreContent.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                            <BookOpen className="h-4 w-4" />
                            {day.practiceTask.slice(0, 15)}...
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
