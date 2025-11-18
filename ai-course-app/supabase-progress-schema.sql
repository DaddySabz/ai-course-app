-- Progress Tracking Schema for AI Course
-- This tracks which lessons users have completed

-- Create the progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  day_number integer NOT NULL,
  completed_at timestamp with time zone DEFAULT now() NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  
  -- Ensure one record per user per day
  UNIQUE(user_id, day_number),
  
  -- Validate day number is between 1 and 30
  CONSTRAINT valid_day_number CHECK (day_number >= 1 AND day_number <= 30)
);

-- Enable Row Level Security
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own progress
CREATE POLICY "Users can view own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own progress
CREATE POLICY "Users can insert own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own progress (e.g., re-complete a day)
CREATE POLICY "Users can update own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id);

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
GRANT SELECT ON public.user_progress_summary TO authenticated;

