import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

interface Message {
  id: number;
  user_name: string | null;
  content: string;
  created_at: string;
}

// 获取留言列表
export async function GET(request: NextRequest) {
  try {
    const client = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data, error } = await client
      .from('messages')
      .select('id, user_name, content, created_at')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 获取总数
    const { count, error: countError } = await client
      .from('messages')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    return NextResponse.json({
      data: data as Message[],
      total: count || 0
    });
  } catch (error) {
    console.error('获取留言失败:', error);
    return NextResponse.json({ error: '获取留言失败' }, { status: 500 });
  }
}

// 提交留言
export async function POST(request: NextRequest) {
  try {
    const client = getSupabaseClient();
    const body = await request.json();
    const { user_name, content } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: '留言内容不能为空' }, { status: 400 });
    }

    if (content.length > 500) {
      return NextResponse.json({ error: '留言内容不能超过500字' }, { status: 400 });
    }

    const { data, error } = await client
      .from('messages')
      .insert({
        user_name: user_name?.trim() || null,
        content: content.trim()
      })
      .select('id, user_name, content, created_at')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data as Message });
  } catch (error) {
    console.error('提交留言失败:', error);
    return NextResponse.json({ error: '提交留言失败' }, { status: 500 });
  }
}
