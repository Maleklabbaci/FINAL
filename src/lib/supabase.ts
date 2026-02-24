import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// Fallback values in case env vars are missing
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://supwbuvojhuhlojlhper.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_EqBAJ53Zhi6kri7xDGMR8Q_8XuBiv9Z";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
