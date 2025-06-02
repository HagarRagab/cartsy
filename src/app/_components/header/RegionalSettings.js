"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Flag } from "lucide-react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";

import RegionalPreference from "@/src/app/_components/header/RegionalPreference";
import SubmitBtn from "@/src/app/_components/shared/SubmitBtn";
import { useAuth } from "@/src/app/_context/AuthContext";
import { setCookie, updateProfileAction } from "@/src/app/_lib/actions";
import { regionalSettingsSchema } from "@/src/app/_lib/validation";
import { currencies, languages } from "@/src/app/_utils/utils";
import { Form } from "@/src/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/components/ui/popover";
import { COOKIES_EXPIRATION } from "@/src/app/_utils/constants";
import { useLocale, useTranslations } from "next-intl";

function RegionalSettings() {
    const { user, settings, setSettings } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const locale = useLocale();

    const form = useForm({
        resolver: zodResolver(regionalSettingsSchema),
        defaultValues: { language: locale, currency: settings.currency },
    });

    const pathnameWithoutLocale = pathname.split("/").slice(2).join("/");

    const t = useTranslations("settings");

    async function onSubmit(values) {
        setIsLoading(true);

        const newData = {
            language: values.language,
            currency: values.currency,
        };

        setSettings(newData);

        // In guest mood
        if (!user) {
            await setCookie("settings", newData, {
                expires: new Date(
                    Date.now() * 1000 * 60 * 60 * 24 * COOKIES_EXPIRATION
                ),
            });
            setIsLoading(false);
            return;
        }

        const result = await updateProfileAction(newData, pathname);

        if (!result.success) {
            toast.error("Event has not been created", {
                description: result.message[locale],
                action: {
                    label: "Close",
                    onClick: () => router.push("/error"),
                },
            });
        } else {
            toast.success("Event has been created", {
                description: result.message[locale],
            });
        }

        setIsLoading(false);

        redirect(`/${newData.language}/${pathnameWithoutLocale}`);
    }

    return (
        <Popover>
            <PopoverTrigger>
                <div className="flex bg-transparent hover:bg-transparent cursor-pointer gap-2 items-center p-0">
                    <div>
                        <Flag size={26} />
                    </div>
                    <div className="sm:flex flex-col items-start text-sm hidden">
                        <p>{locale.toUpperCase()}/</p>
                        <p className="flex items-center gap-1 font-semibold">
                            {settings.currency}
                            <ChevronDown size={20} />
                        </p>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-60 sm:w-80 mb-4 sm:mb-0">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4"
                    >
                        <div className="grid gap-2">
                            <RegionalPreference
                                label={t("language")}
                                form={form}
                                items={languages}
                                name="language"
                            />
                            <RegionalPreference
                                label={t("currency")}
                                form={form}
                                items={currencies}
                                name="currency"
                            />
                        </div>
                        <SubmitBtn
                            isLoading={isLoading}
                            btnClass="primary-btn w-full"
                        >
                            {t("save")}
                        </SubmitBtn>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
}

export default RegionalSettings;
