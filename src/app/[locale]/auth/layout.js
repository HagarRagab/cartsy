"use client";

import { ShieldCheck } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { useAuth } from "@/src/app/_context/AuthContext";
import postBox from "@/public/post-box.png";
import signBoard from "@/public/sign-board.png";

function Layout({ children }) {
    const { user } = useAuth();
    const pathname = usePathname();
    if (user) redirect("/");

    const locale = useLocale();
    const t = useTranslations("signInUp");

    let formTitle = t("title");
    let formSubtitle = (
        <span className="w-full flex items-center justify-center gap-1">
            <ShieldCheck size={15} />
            <span>{t("subTitle")}</span>
        </span>
    );
    let formImg;

    switch (pathname) {
        case `/${locale}/auth/forgot-password`:
            formTitle = t("forgotPass");
            formSubtitle = <span>{t("forgotPassSubTitle")}</span>;
            formImg = postBox;
            break;
        case `/${locale}/auth/update-password`:
            formTitle = t("resetPassTitle");
            formSubtitle = <span>{t("setPassMsg")}</span>;
            formImg = signBoard;
            break;
        default:
            break;
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-image">
            <div className="p-10 flex flex-col justify-center items-center bg-bg-100 shadow-2xl rounded-2xl m-10">
                <div className="text-center mb-8">
                    {formImg && (
                        <div className="relative w-25 aspect-square mx-auto mb-4">
                            <Image
                                src={formImg.src}
                                alt={formTitle}
                                fill
                                className="object-contain"
                            />
                        </div>
                    )}
                    <h1 className="font-semibold text-2xl mb-2">{formTitle}</h1>
                    <p className="flex items-center gap-2 text-xs text-text-300">
                        {formSubtitle}
                    </p>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Layout;
