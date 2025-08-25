/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `subject` (text, required)
      - `message` (text, required)
      - `submitted_at` (timestamp with timezone)
      - `ip_address` (text, optional)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for service role to insert and read submissions
    - Add policy for authenticated users to read their own submissions

  3. Indexes
    - Index on email for faster lookups
    - Index on submitted_at for chronological queries
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

-- Policy for service role to insert and read contact submissions
CREATE POLICY "Allow service role to insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Allow service role to read contact submissions"
  ON contact_submissions
  FOR SELECT
  TO service_role
  USING (true);

-- Policy for authenticated users to read their own submissions
CREATE POLICY "Users can read their own submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (email = (jwt() ->> 'email'::text));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
  ON contact_submissions (email);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at 
  ON contact_submissions (submitted_at DESC);