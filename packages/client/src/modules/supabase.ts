import { createClient } from "@supabase/supabase-js";

import { supabaseAnonKey, supabaseUrl } from "@/constants";

import { Database } from "@/types/database-generated.types";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
