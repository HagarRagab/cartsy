"use client";

import { ShieldCheck } from "lucide-react";
import { redirect, usePathname } from "next/navigation";

import { useAuth } from "@/app/_context/AuthContext";
import postBox from "@/public/post-box.png";
import signBoard from "@/public/sign-board.png";
import Image from "next/image";

function Layout({ children }) {
    const { user } = useAuth();
    const pathname = usePathname();
    console.log(pathname);
    if (user) redirect("/");

    let formTitle = "Register/Sign in";
    let formSubtitle = (
        <>
            <ShieldCheck size={15} />
            <span>You information is protected</span>
        </>
    );
    let formImg;

    switch (pathname) {
        case "/auth/forgot-password":
            formTitle = "Forgot your password?";
            formSubtitle = (
                <span>
                    Enter your email so that we can send you password reset link
                </span>
            );
            formImg = postBox;
            break;
        case "/auth/update-password":
            formTitle = "Reset password";
            formSubtitle = <span>Please kindly set your new password</span>;
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
