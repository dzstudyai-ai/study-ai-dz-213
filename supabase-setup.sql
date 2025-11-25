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

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for documents bucket
-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents');

-- Allow public read access (adjust based on your needs)
CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'documents');

-- Allow users to delete their own uploads (optional)
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'documents');

-- Enable Row Level Security on documents table
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert documents (adjust based on your needs)
CREATE POLICY "Allow public inserts"
ON documents FOR INSERT
TO public
WITH CHECK (true);

-- Policy to allow anyone to read documents (adjust based on your needs)
CREATE POLICY "Allow public reads"
ON documents FOR SELECT
TO public
USING (true);
