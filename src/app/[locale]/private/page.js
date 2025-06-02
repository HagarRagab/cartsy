import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

import { createClient } from "@/src/utils/supabase/server";

export default async function PrivatePage() {
    const supabase = await createClient();
    const locale = await getLocale();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect(`${locale}/auth/login`);
    }

    return <p>Hello {data.user.email}</p>;
}
