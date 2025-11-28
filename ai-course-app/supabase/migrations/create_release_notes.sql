-- Create release_notes table for tracking app updates
CREATE TABLE IF NOT EXISTS release_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  version VARCHAR(20) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL CHECK (type IN ('feature', 'fix', 'improvement')),
  visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_release_notes_visible_created 
ON release_notes(visible, created_at DESC);

-- Add some sample release notes
INSERT INTO release_notes (version, title, description, type) VALUES
('0.5.0', 'Beta Launch', 'Launched beta version with 14 users! Core features including course progress tracking, certificates, and admin tools are live.', 'feature'),
('0.4.9', 'Admin Panel Complete', 'Full admin user management with delete, reset progress, unlock course, and complete all days functionality.', 'feature'),
('0.4.8', 'Email Display Fixed', 'All user email addresses now display correctly in admin panel across all signup methods.', 'fix'),
('0.4.7', 'Standardized Signup Forms', 'Consistent signup experience across email, Waitrose, and tech partner authentication.', 'improvement');

-- Add RLS policies
ALTER TABLE release_notes ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read visible release notes
CREATE POLICY "Anyone can view visible release notes"
  ON release_notes
  FOR SELECT
  USING (visible = true);

-- Only admins can manage release notes (you'll need to add admin check)
-- For now, just allow service role
CREATE POLICY "Service role can manage release notes"
  ON release_notes
  FOR ALL
  USING (auth.role() = 'service_role');
