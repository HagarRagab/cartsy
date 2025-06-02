"use client";

import Image from "next/image";
import { useFormStatus } from "react-dom";

import { loginWithGoogle } from "@/src/app/_auth/actions";
import { Button } from "@/src/components/ui/button";
import SpinnerIcon from "@/src/app/_components/shared/SpinnerIcon";
import { useTranslations } from "next-intl";

function GoogleLogin() {
    return (
        <form action={loginWithGoogle}>
            <Submit />
        </form>
    );
}

function Submit() {
    const { pending } = useFormStatus();

    const t = useTranslations("signInUp");

    return (
        <Button
            variant="outline"
            className="min-w-96 bg-transparent border-primary-200 flex items-center gap-2 py-0 cursor-pointer"
            disabled={pending}
        >
            {pending ? (
                <SpinnerIcon />
            ) : (
                <Image
                    src="/google.svg"
                    alt="google icon"
                    width={20}
                    height={20}
                />
            )}
            <p>{t("continueGoogle")}</p>
        </Button>
    );
}

export default GoogleLogin;
