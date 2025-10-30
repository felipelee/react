import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

let supabase: ReturnType<typeof createClient<Database>>;

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured');
  }

  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  // Create a dummy client that won't crash the app
  supabase = createClient<Database>('https://placeholder.supabase.co', 'placeholder-key', {
    auth: {
      persistSession: false,
    },
  });
}

export { supabase };
