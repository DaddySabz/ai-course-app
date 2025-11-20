-- Add contact_email column to user_profiles for tech partner tracking
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS contact_email text;

-- Add name column for additional name storage
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS name text;

