"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Flag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useAuth } from "@/app/_context/AuthContext";
import { regionalSettingsSchema } from "@/app/_lib/validation";
import { updateProfileAction } from "@/app/_lib/actions";
import { currencies, languages } from "@/app/_utils/helper";
import RegionalPreference from "@/app/_components/header/RegionalPreference";
import { Form } from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import SubmitBtn from "@/app/_components/shared/SubmitBtn";

function RegionalSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useAuth();
    const { country, city, currency, language } = user;

    const form = useForm({
        resolver: zodResolver(regionalSettingsSchema),
        defaultValues: {
            country: country || "",
            city: city || "",
            currency: currency || "",
            language: language || "English",
        },
    });

    async function onSubmit(values) {
        setIsLoading(true);

        const newData = {
            language: values.language,
            currency: values.currency,
        };

        const result = await updateProfileAction(newData, pathname);

        if (!result.success) {
            toast.error("Event has not been created", {
                description: result.message,
                action: {
                    label: "Close",
                    onClick: () => router.push("/error"),
                },
            });
        } else {
            toast.success("Event has been created", {
                description: result.message,
            });
        }

        setIsLoading(false);
    }

    return (
        <Popover>
            <PopoverTrigger>
                <div className="bg-transparent hover:bg-transparent cursor-pointer flex gap-2 items-center p-0">
                    <div>
                        <Flag size={26} />
                    </div>
                    <div className="text-sm text-left">
                        <p>{language?.slice(0, 2).toUpperCase() || "EN"}/</p>
                        <p className="flex items-center gap-1 font-semibold">
                            {currency}
                            <ChevronDown size={20} />
                        </p>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4"
                    >
                        <div className="grid gap-2">
                            <RegionalPreference
                                label="Language:"
                                form={form}
                                items={languages}
                                name="language"
                            />
                            <RegionalPreference
                                label="Currency:"
                                form={form}
                                items={currencies}
                                name="currency"
                            />
                        </div>
                        <SubmitBtn
                            label="Save"
                            loadingLabel="Saving..."
                            isLoading={isLoading}
                            btnClass="w-full"
                        />
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
}

export default RegionalSettings;
