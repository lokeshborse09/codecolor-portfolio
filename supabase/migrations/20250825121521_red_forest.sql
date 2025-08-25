/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `subject` (text, required)
      - `message` (text, required)
      - `submitted_at` (timestamp)
      - `ip_address` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for service role to insert data
    - Add policy for authenticated users to read their own submissions (optional)
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy to allow service role to insert (for the edge function)
CREATE POLICY "Allow service role to insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy to allow service role to read all submissions (for admin access)
CREATE POLICY "Allow service role to read contact submissions"
  ON contact_submissions
  FOR SELECT
  TO service_role
  USING (true);

-- Optional: Policy to allow authenticated users to read their own submissions
CREATE POLICY "Users can read their own submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);