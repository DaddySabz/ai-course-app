-- Certificates Schema for AI Course
-- This stores certificates issued when users complete all 30 days

-- Drop existing table if it exists (for clean reinstall)
DROP TABLE IF EXISTS public.certificates CASCADE;

-- Create the certificates table
CREATE TABLE public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  user_name text NOT NULL,
  user_email text NOT NULL,
  completion_date date NOT NULL,
  issued_at timestamp with time zone DEFAULT now() NOT NULL,
  
  -- Ensure one certificate per user
  UNIQUE(user_id)
);

-- Disable Row Level Security since we're using NextAuth + server-side API routes
-- All authentication/authorization is handled in our Next.js API routes
ALTER TABLE public.certificates DISABLE ROW LEVEL SECURITY;

-- Create index for faster user lookups
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON public.certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_issued_at ON public.certificates(issued_at);

