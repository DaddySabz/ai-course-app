-- Add contact_email column to user_profiles for tech partner tracking
-- This stores the personal email entered by tech partners (separate from login email)
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS contact_email text;

