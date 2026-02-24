import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://quicsqnemgdvzmldalcq.supabase.co";
const supabaseAnonKey = "sb_publishable_AUvnD8jXNN5HoCzUHf0i-g_ziZ7Lp3L";

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
