import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface User {
  id: string;
  email: string;
  password_hash: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserProgress {
  id?: string;
  user_id: string;
  lesson_id: number;
  completed: boolean;
  completed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Certificate {
  id?: string;
  user_id: string;
  user_name: string;
  user_email: string;
  completion_date: string;
  certificate_url?: string;
  created_at?: string;
}
