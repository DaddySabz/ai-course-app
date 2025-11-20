-- User Profiles Schema
-- This stores user profile customizations (name, avatar)

-- Drop existing table if it exists (for clean reinstall)
DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- Create the user profiles table
CREATE TABLE public.user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text UNIQUE NOT NULL,
  display_name text,
  avatar_url text,
  partner_type text, -- 'waitrose', 'tech', or null for regular users
  partner_code text, -- 'waitrose19' or custom codes for verification
  organization text, -- For tech partners only
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Disable Row Level Security since we're using NextAuth + server-side API routes
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- Create index for faster user lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);

