-- Fix certificate names for tech partners
-- This updates certificates to use the correct display_name from user_profiles

-- For your specific case, you can run this:
-- Replace 'your-user-id-here' with your actual user ID from the session

-- Option 1: Delete your old certificate (recommended - will be recreated with correct name)
DELETE FROM public.certificates 
WHERE user_id = 'Demo Company'; -- This is your tech partner user_id (organization name)

-- Option 2: Update the certificate name to match profile
-- (This would need to be customized for your specific user_id and name)
-- UPDATE public.certificates 
-- SET user_name = 'Saby Demo'
-- WHERE user_id = 'Demo Company';

