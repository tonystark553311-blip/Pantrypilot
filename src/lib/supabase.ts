import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  image_url: string;
  expiry_date: string | null;
  location: string;
  created_at: string;
  updated_at: string;
}
