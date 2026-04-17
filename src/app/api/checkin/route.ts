import { NextRequest, NextResponse } from 'next/server';

// 打卡记录类型
interface CheckinRecord {
  id: number;
  user_id: string;
  day_number: number;
  week_number: number;
  notes: string | null;
  code_submitted: string | null;
  completed_at: string;
  created_at: string;
}

// 简单的内存存储（用于开发环境，当Supabase未配置时使用）
const memoryStore: Map<string, CheckinRecord[]> = new Map();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: '缺少userId参数' }, { status: 400 });
  }

  // 尝试使用Supabase
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data, error } = await supabase
        .from('checkins')
        .select('*')
        .eq('user_id', userId)
        .order('day_number', { ascending: true });

      if (!error) {
        return NextResponse.json({ success: true, data });
      }
    }
  } catch (e) {
    // Supabase未配置，使用内存存储
  }

  // 使用内存存储
  const userCheckins = memoryStore.get(userId) || [];
  return NextResponse.json({ success: true, data: userCheckins });
}

// 创建打卡记录
export async function POST(request: NextRequest) {
  try {
    const { userId, dayNumber, weekNumber, notes, codeSubmitted } = await request.json();

    if (!userId || !dayNumber || !weekNumber) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }

    // 尝试使用Supabase
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (supabaseUrl && supabaseAnonKey) {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        
        // 创建或更新打卡记录
        const { data: checkinData, error: checkinError } = await supabase
          .from('checkins')
          .upsert({
            user_id: userId,
            day_number: dayNumber,
            week_number: weekNumber,
            notes: notes || null,
            code_submitted: codeSubmitted || null,
            completed_at: new Date().toISOString()
          })
          .select()
          .single();

        if (!checkinError) {
          // 获取当前打卡总数
          const { count } = await supabase
            .from('checkins')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);

          // 更新用户进度
          const today = new Date().toISOString().split('T')[0];
          await supabase.from('user_progress').upsert({
            user_id: userId,
            current_day: Math.min(dayNumber + 1, 30),
            total_days_completed: count || 0,
            streak_days: count || 0,
            last_checkin_date: today,
            updated_at: new Date().toISOString()
          });

          return NextResponse.json({
            success: true,
            checkin: checkinData,
            progress: { total_days_completed: count }
          });
        }
      }
    } catch (e) {
      // Supabase未配置，使用内存存储
    }

    // 使用内存存储
    if (!memoryStore.has(userId)) {
      memoryStore.set(userId, []);
    }
    const userCheckins = memoryStore.get(userId)!;
    
    // 检查是否已存在该天打卡
    const existingIndex = userCheckins.findIndex(c => c.day_number === dayNumber);
    const checkinRecord = {
      id: userCheckins.length + 1,
      user_id: userId,
      day_number: dayNumber,
      week_number: weekNumber,
      notes: notes || null,
      code_submitted: codeSubmitted || null,
      completed_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      userCheckins[existingIndex] = { ...userCheckins[existingIndex], ...checkinRecord };
    } else {
      userCheckins.push(checkinRecord);
    }

    return NextResponse.json({
      success: true,
      checkin: checkinRecord,
      progress: { total_days_completed: userCheckins.length }
    });
  } catch (error) {
    console.error('创建打卡记录失败:', error);
    return NextResponse.json({ error: '创建打卡记录失败' }, { status: 500 });
  }
}
