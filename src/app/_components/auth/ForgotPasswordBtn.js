"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

function ForgotPasswordBtn() {
    const locale = useLocale();

    const t = useTranslations("signInUp");

    return (
        <div className="relative -top-2 mb-0 flex justify-end">
            <Link
                href={`/${locale}/auth/forgot-password`}
                variant="ghost"
                className="w-fit hover:underline transition-all mb-0 ml-auto cursor-pointer text-sm text-text-400 pr-0 pb-0 hover:bg-transparent"
            >
                {t("forgotPass")}
            </Link>
        </div>
    );
}

export default ForgotPasswordBtn;
