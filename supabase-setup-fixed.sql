-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  domain TEXT,
  description TEXT,
  email TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for documents (PUBLIC)
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public inserts" ON documents;
DROP POLICY IF EXISTS "Allow public reads" ON documents;

-- Storage policies for documents bucket - ALLOW PUBLIC ACCESS
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'documents');

CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'documents');

-- Enable Row Level Security on documents table
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert documents
CREATE POLICY "Allow public inserts"
ON documents FOR INSERT
TO public
WITH CHECK (true);

-- Policy to allow anyone to read documents
CREATE POLICY "Allow public reads"
ON documents FOR SELECT
TO public
USING (true);

-- Policy to allow anyone to update documents
CREATE POLICY "Allow public updates"
ON documents FOR UPDATE
TO public
USING (true);

-- Policy to allow anyone to delete documents
CREATE POLICY "Allow public deletes"
ON documents FOR DELETE
TO public
USING (true);
