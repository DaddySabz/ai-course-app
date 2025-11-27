-- Simple solution: Copy emails from the custom 'users' table to user_profiles
-- This uses the tables you can see in Supabase UI

-- Step 1: Update user_profiles.contact_email with emails from the custom users table
UPDATE user_profiles up
SET contact_email = u.email
FROM users u
WHERE u.id = up.user_id
AND up.contact_email IS NULL;

-- Step 2: Verify the update
SELECT 
    COUNT(*) FILTER (WHERE contact_email IS NOT NULL) as profiles_with_email,
    COUNT(*) FILTER (WHERE contact_email IS NULL) as profiles_without_email,
    COUNT(*) as total_profiles
FROM user_profiles;

-- Step 3: Show which profiles still don't have emails
SELECT user_id, display_name, partner_type, created_at
FROM user_profiles
WHERE contact_email IS NULL;
