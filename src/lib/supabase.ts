import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Helper to check if credentials are valid Supabase format
const isValidConfig = supabaseUrl.startsWith('https://') && supabaseUrl.includes('.supabase.co') && supabaseAnonKey.length > 20;

let supabase: any;

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (e) {
  console.error("Supabase Initialization Error:", e);
  // Fallback to a proxy that doesn't throw but returns errors
  supabase = {
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: null, error: { message: "Supabase not configured correctly" } }),
          single: async () => ({ data: null, error: { message: "Supabase not configured correctly" } })
        })
      }),
      insert: async () => ({ error: { message: "Supabase not configured correctly" } })
    }),
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  };
}

export { supabase };

if (!isValidConfig) {
  console.warn('Supabase configuration is invalid or missing. Please update .env.local with your real Supabase credentials.');
}
