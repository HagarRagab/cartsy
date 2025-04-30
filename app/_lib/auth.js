import { supabase } from "@/app/_lib/supabase";

supabase.auth.signInWithOAuth({
    provider: "google",
});
