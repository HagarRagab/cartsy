"use client";

import { User } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/src/app/_context/AuthContext";
import ProfileAvatar from "@/src/app/_components/header/ProfileAvatar";
import { useTranslations } from "next-intl";

function Account({ locale }) {
    const { user } = useAuth();
    const t = useTranslations("account");

    return (
        <>
            {!user ? (
                <Link
                    href={`/${locale}/auth/login`}
                    className="flex items-center gap-2"
                >
                    <User size={25} />
                    <div className="flex flex-col text-sm">
                        <span className="hidden sm:block text-text-500">
                            {t("welcome")}
                        </span>
                        <span className="hidden sm:block font-semibold">
                            {t("logIn")}
                        </span>
                    </div>
                </Link>
            ) : (
                <ProfileAvatar user={user} locale={locale} />
            )}
        </>
    );
}

export default Account;
