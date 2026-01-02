import { createClient } from '@supabase/supabase-js';

// Verifique se os nomes no seu .env estão exatamente assim
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
