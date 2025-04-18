
import { createClient } from '@supabase/supabase-js';

// Get environment variables or use fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'import.meta.env.VITE_SUPABASE_URL!';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'import.meta.env.VITE_SUPABASE_ANON_KEY!';

// Only show warning in development
if (import.meta.env.DEV && (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY)) {
  console.warn('Using fallback Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
