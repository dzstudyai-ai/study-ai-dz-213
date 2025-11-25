import { createClient } from '@supabase/supabase-js';

// Safely get environment variables with fallbacks for build time
const supabaseUrl = typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    : process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';

const supabaseAnonKey = typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://placeholder.supabase.co')) {
    console.warn('Supabase URL or Anon Key is missing. Please check your environment variables on Vercel.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
