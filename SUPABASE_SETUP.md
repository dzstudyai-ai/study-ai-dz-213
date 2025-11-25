# Supabase Setup Instructions

## Step 1: Run SQL Commands in Supabase Dashboard

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the contents of `supabase-setup.sql` into the editor
6. Click **Run** to execute the SQL commands

This will create:
- ✅ `documents` table to store document metadata
- ✅ `documents` storage bucket to store PDF files
- ✅ Storage policies to allow uploads and downloads
- ✅ Row Level Security policies for the documents table

## Step 2: Verify Setup

### Check Table
1. Go to **Table Editor** in the left sidebar
2. You should see a new table called `documents`

### Check Storage
1. Go to **Storage** in the left sidebar
2. You should see a new bucket called `documents`

## Step 3: Test Upload

1. Make sure your development server is running (`npm run dev`)
2. Open http://localhost:9002 in your browser
3. Click "Upload PDF" button
4. Fill in the form:
   - Title: Test Document
   - Domain: Computer Science (optional)
   - Description: This is a test (optional)
   - Email: your@email.com
   - File: Select a PDF file
5. Click "Save Document"

## Step 4: Verify Data in Supabase

### Check Storage
1. Go to **Storage** → **documents** bucket
2. You should see your uploaded PDF file

### Check Database
1. Go to **Table Editor** → **documents** table
2. You should see a new row with your document metadata

## Troubleshooting

If you get an error:
- **"relation does not exist"**: Run the SQL setup commands in Step 1
- **"bucket does not exist"**: Run the SQL setup commands in Step 1
- **"permission denied"**: Check that the storage policies were created correctly
- **"Invalid credentials"**: Check your `.env.local` file has correct Supabase URL and Anon Key
