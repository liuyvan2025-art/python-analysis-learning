export interface DayContent {
  day: number;
  week: number;
  title: string;
  coreContent: string[];
  practiceTask: string;
  codeExample?: string;
  demoUrl?: string;
  checkpoints?: string[];
}

export interface WeekContent {
  week: number;
  title: string;
  description: string;
  days: DayContent[];
}

export interface CheckinRecord {
  id: number;
  user_id: string;
  day_number: number;
  week_number: number;
  completed_at: string;
  notes: string | null;
  code_submitted: string | null;
  created_at: string;
}

export interface UserProgress {
  user_id: string;
  current_day: number;
  total_days_completed: number;
  streak_days: number;
  last_checkin_date: string | null;
}

export interface PythonExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime?: number;
  hasTimedOut?: boolean;
  imageBase64?: string;
}
