-- Migration: Sync all emails from auth.users to user_profiles.contact_email
-- This consolidates user data so we only need to look in one place

-- Step 1: Update user_profiles.contact_email with emails from auth.users
UPDATE user_profiles up
SET contact_email = au.email
FROM auth.users au
WHERE up.user_id = au.id
AND up.contact_email IS NULL;

-- Step 2: Verify the update (this will show you how many rows were updated)
SELECT 
    COUNT(*) FILTER (WHERE contact_email IS NOT NULL) as profiles_with_email,
    COUNT(*) FILTER (WHERE contact_email IS NULL) as profiles_without_email,
    COUNT(*) as total_profiles
FROM user_profiles;

-- Step 3: Show any profiles that still don't have emails (shouldn't be any after sync)
SELECT user_id, display_name, partner_type, created_at
FROM user_profiles
WHERE contact_email IS NULL;
