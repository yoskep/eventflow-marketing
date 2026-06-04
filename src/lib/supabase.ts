import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

// During static builds without configured credentials (e.g. CI without secrets),
// fall back to a harmless placeholder client. Data fetches then fail gracefully
// and call sites fall back to their default content, rather than crashing the build.
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing SUPABASE_URL or SUPABASE_ANON_KEY — using placeholder client (data fetches will fall back).');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
