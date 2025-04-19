
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid values before creating the client
let supabase;

if (supabaseUrl && supabaseAnonKey) {
  // Only create the client if we have valid credentials
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase credentials missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  // Create a mock client that returns errors for all operations
  supabase = createClient('http://localhost', 'mock-key');
}

export { supabase };
