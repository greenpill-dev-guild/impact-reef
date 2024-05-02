import {assertExists} from "@/utils/assertExists";

export const supabaseUrl = assertExists(process.env.NEXT_PUBLIC_SUPABASE_URL);
export const supabaseAnonKey = assertExists(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);