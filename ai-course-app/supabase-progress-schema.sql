-- Progress Tracking Schema for AI Course
-- This tracks which lessons users have completed

-- Drop existing objects if they exist (for clean reinstall)
DROP VIEW IF EXISTS public.user_progress_summary CASCADE;
DROP TABLE IF EXISTS public.user_progress CASCADE;

-- Create the progress table
-- Note: We use text for user_id since we're using NextAuth (not Supabase Auth)
CREATE TABLE public.user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  day_number integer NOT NULL,
  completed_at timestamp with time zone DEFAULT now() NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  
  -- Ensure one record per user per day
  UNIQUE(user_id, day_number),
  
  -- Validate day number is between 1 and 30
  CONSTRAINT valid_day_number CHECK (day_number >= 1 AND day_number <= 30)
);

-- Disable Row Level Security since we're using NextAuth + server-side API routes
-- All authentication/authorization is handled in our Next.js API routes
ALTER TABLE public.user_progress DISABLE ROW LEVEL SECURITY;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_day_number ON public.user_progress(day_number);

-- Create a view for easy progress checking
CREATE OR REPLACE VIEW public.user_progress_summary AS
SELECT 
  user_id,
  COUNT(*) as completed_days,
  MAX(day_number) as highest_day_completed,
  ARRAY_AGG(day_number ORDER BY day_number) as completed_day_numbers
FROM public.user_progress
GROUP BY user_id;

-- Grant access to the view
ALTER VIEW public.user_progress_summary OWNER TO postgres;

