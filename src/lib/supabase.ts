import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 获取打卡记录
export async function getCheckins(userId: string) {
  const { data, error } = await supabase
    .from('checkins')
    .select('*')
    .eq('user_id', userId)
    .order('day_number', { ascending: true });
  
  if (error) throw error;
  return data;
}

// 创建打卡记录
export async function createCheckin(
  userId: string,
  dayNumber: number,
  weekNumber: number,
  notes?: string,
  codeSubmitted?: string
) {
  const { data, error } = await supabase
    .from('checkins')
    .upsert({
      user_id: userId,
      day_number: dayNumber,
      week_number: weekNumber,
      notes: notes || null,
      code_submitted: codeSubmitted || null
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// 获取用户进度
export async function getUserProgress(userId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

// 更新用户进度
export async function updateUserProgress(
  userId: string,
  currentDay: number,
  totalDaysCompleted: number,
  streakDays: number
) {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      current_day: currentDay,
      total_days_completed: totalDaysCompleted,
      streak_days: streakDays,
      last_checkin_date: today,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// 检查今日是否已打卡
export async function checkTodayCheckin(userId: string, dayNumber: number) {
  const { data, error } = await supabase
    .from('checkins')
    .select('*')
    .eq('user_id', userId)
    .eq('day_number', dayNumber)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return !!data;
}
