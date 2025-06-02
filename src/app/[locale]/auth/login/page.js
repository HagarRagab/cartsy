import Link from "next/link";
import { getTranslations } from "next-intl/server";

import LoginForm from "@/src/app/_components/auth/LoginForm";

async function Page({ params }) {
    const { locale } = await params;
    const t = await getTranslations("signInUp");

    return (
        <>
            <LoginForm />
            <div className="flex items-center gap-2 mt-4 text-sm">
                <p>{t("createNewAccount")}</p>
                <Link
                    href={`/${locale}/auth/signup`}
                    className="hover:underline transition-all font-semibold text-accent-200"
                >
                    {t("signup")}
                </Link>
            </div>
        </>
    );
}

export default Page;
