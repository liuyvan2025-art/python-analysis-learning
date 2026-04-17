"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, User, Loader2, Calendar } from "lucide-react";

interface Message {
  id: number;
  user_name: string | null;
  content: string;
  created_at: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours === 0) {
      const minutes = Math.floor(diff / (1000 * 60));
      return minutes <= 1 ? "刚刚" : `${minutes}分钟前`;
    }
    return `${hours}小时前`;
  }
  if (days === 1) return "昨天";
  if (days < 7) return `${days}天前`;
  return date.toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [total, setTotal] = useState(0);
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/messages?limit=50");
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setMessages(data.data || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      setError("获取留言失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: userName.trim() || null,
          content: content.trim(),
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setContent("");
        setUserName("");
        fetchMessages();
      }
    } catch (err) {
      setError("提交留言失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* 标题 */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <MessageSquare className="h-8 w-8" />
          留言板
        </h1>
        <p className="text-muted-foreground">
          欢迎留下你的学习心得、问题或建议
        </p>
      </div>

      {/* 发布留言 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">发表留言</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="昵称（选填）"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  maxLength={20}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Textarea
                placeholder="写下你的留言..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                maxLength={500}
                className="resize-none"
              />
              <div className="text-right text-xs text-muted-foreground mt-1">
                {content.length}/500
              </div>
            </div>
            {error && (
              <div className="text-sm text-destructive">{error}</div>
            )}
            <Button type="submit" disabled={submitting || !content.trim()}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  提交中...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  发布留言
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 留言列表 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">留言列表</h2>
          <Badge variant="secondary">
            共 {total} 条留言
          </Badge>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              暂无留言，来说点什么吧！
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <Card key={msg.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {msg.user_name || "匿名用户"}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(msg.created_at)}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
