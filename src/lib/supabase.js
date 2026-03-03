import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here';

// Create Supabase client
// This client is used for client-side operations (authenticated with anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
});

// Server-side client (for API routes)
// This should only be used in server components or API routes
// import { createClient } from '@supabase/ssr'
// export const createServerClient = () => createClient(supabaseUrl, supabaseAnonKey)

export default supabase;
