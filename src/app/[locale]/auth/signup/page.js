import SignupForm from "@/src/app/_components/auth/SignupForm";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

async function Page({ params }) {
    const { locale } = await params;

    const t = await getTranslations("signInUp");

    return (
        <>
            <SignupForm />
            <div className="flex items-center gap-2 mt-4 text-sm">
                <p>{t("alreadyHaveAccount")}</p>
                <Link
                    href={`/${locale}/auth/login`}
                    className="hover:underline transition-all font-semibold text-accent-200"
                >
                    {t("login")}
                </Link>
            </div>
        </>
    );
}

export default Page;
