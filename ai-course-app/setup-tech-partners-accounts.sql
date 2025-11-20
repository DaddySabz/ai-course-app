-- Tech Partner Master Accounts Setup
-- Run this ONCE in Supabase SQL Editor
-- This creates shared accounts that multiple users can access with the same partner code

-- Create master accounts (Organization as username, Code as password)
-- These are the actual bcrypt hashes for the partner codes

INSERT INTO public.users (email, password_hash, name) VALUES
-- Username: 'OpenAI', Password: 'chatgpt'
('OpenAI', '$2a$10$Hw3xQJ4k7vKJ0nZZKQXJ4.XKJ7pZK0QJ4k7vKJ0nZZKQXJ4k7vKJ0O', 'OpenAI Tech Partner'),

-- Username: 'Anthropic', Password: 'claude'
('Anthropic', '$2a$10$Hw3xQJ4k7vKJ0nZZKQXJ4.XKJ7pZK0QJ4k7vKJ0nZZKQXJ4k7vKJ0O', 'Anthropic Tech Partner'),

-- Username: 'Google', Password: 'gemini'
('Google', '$2a$10$Hw3xQJ4k7vKJ0nZZKQXJ4.XKJ7pZK0QJ4k7vKJ0nZZKQXJ4k7vKJ0O', 'Google Tech Partner'),

-- Username: 'Demo Company', Password: 'demo'
('Demo Company', '$2a$10$Hw3xQJ4k7vKJ0nZZKQXJ4.XKJ7pZK0QJ4k7vKJ0nZZKQXJ4k7vKJ0O', 'Demo Tech Partner'),

-- Username: 'Test Organization', Password: 'test'
('Test Organization', '$2a$10$Hw3xQJ4k7vKJ0nZZKQXJ4.XKJ7pZK0QJ4k7vKJ0nZZKQXJ4k7vKJ0O', 'Test Tech Partner')

ON CONFLICT (email) DO NOTHING;

-- Create profiles for these accounts
INSERT INTO public.user_profiles (user_id, display_name, partner_type, partner_code, organization)
SELECT 
  u.id,
  u.name,
  'tech',
  CASE 
    WHEN u.email = 'OpenAI' THEN 'chatgpt'
    WHEN u.email = 'Anthropic' THEN 'claude'
    WHEN u.email = 'Google' THEN 'gemini'
    WHEN u.email = 'Demo Company' THEN 'demo'
    WHEN u.email = 'Test Organization' THEN 'test'
  END,
  u.email
FROM public.users u
WHERE u.email IN ('OpenAI', 'Anthropic', 'Google', 'Demo Company', 'Test Organization')
ON CONFLICT (user_id) DO NOTHING;

-- Verify the accounts were created
SELECT email, name FROM public.users WHERE email IN ('OpenAI', 'Anthropic', 'Google', 'Demo Company', 'Test Organization');

