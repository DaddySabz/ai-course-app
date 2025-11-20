-- Tech Partner Master Accounts
-- These accounts allow multiple users to access the course using the same partner code
-- Username = Organization name, Password = Partner code

-- Hash passwords first (these are hashed versions of the partner codes)
-- You'll need to run these through bcrypt.hash(code, 10) and update the hashes

-- For now, we'll use a simple setup where:
-- email = organization name
-- password = partner code (to be hashed)

-- Insert master tech partner accounts
-- Password for each is the lowercase version of the code

INSERT INTO public.users (email, password_hash, name) VALUES
('OpenAI', '$2a$10$someHashForChatgpt', 'OpenAI Tech Partner'),
('Anthropic', '$2a$10$someHashForClaude', 'Anthropic Tech Partner'),
('Google', '$2a$10$someHashForGemini', 'Google Tech Partner'),
('Notion', '$2a$10$someHashForNotion', 'Notion Tech Partner'),
('Adobe', '$2a$10$someHashForAdobe', 'Adobe Tech Partner'),
('Microsoft', '$2a$10$someHashForMicrosoft', 'Microsoft Tech Partner'),
('Meta', '$2a$10$someHashForMeta', 'Meta Tech Partner'),
('Apple', '$2a$10$someHashForApple', 'Apple Tech Partner'),
('Amazon', '$2a$10$someHashForAmazon', 'Amazon Tech Partner'),
('Tesla', '$2a$10$someHashForTesla', 'Tesla Tech Partner'),
('NVIDIA', '$2a$10$someHashForNvidia', 'NVIDIA Tech Partner'),
('Salesforce', '$2a$10$someHashForSalesforce', 'Salesforce Tech Partner'),
('Demo Company', '$2a$10$someHashForDemo', 'Demo Tech Partner'),
('Test Organization', '$2a$10$someHashForTest', 'Test Tech Partner')
ON CONFLICT (email) DO NOTHING;

-- Create profiles for tech partners
INSERT INTO public.user_profiles (user_id, display_name, partner_type, partner_code, organization)
SELECT id, name, 'tech', 
  CASE 
    WHEN email = 'OpenAI' THEN 'chatgpt'
    WHEN email = 'Anthropic' THEN 'claude'
    WHEN email = 'Google' THEN 'gemini'
    WHEN email = 'Notion' THEN 'notion'
    WHEN email = 'Adobe' THEN 'adobe'
    WHEN email = 'Microsoft' THEN 'microsoft'
    WHEN email = 'Meta' THEN 'meta'
    WHEN email = 'Apple' THEN 'apple'
    WHEN email = 'Amazon' THEN 'amazon'
    WHEN email = 'Tesla' THEN 'tesla'
    WHEN email = 'NVIDIA' THEN 'nvidia'
    WHEN email = 'Salesforce' THEN 'salesforce'
    WHEN email = 'Demo Company' THEN 'demo'
    WHEN email = 'Test Organization' THEN 'test'
  END,
  email
FROM public.users
WHERE email IN ('OpenAI', 'Anthropic', 'Google', 'Notion', 'Adobe', 'Microsoft', 'Meta', 'Apple', 'Amazon', 'Tesla', 'NVIDIA', 'Salesforce', 'Demo Company', 'Test Organization')
ON CONFLICT (user_id) DO NOTHING;

