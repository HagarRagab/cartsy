"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";

import ErrorMsg from "@/src/app/_components/shared/ErrorMsg";
import SubmitBtn from "@/src/app/_components/shared/SubmitBtn";
import { signupFormSchema } from "@/src/app/_lib/validation";
import { signup } from "@/src/app/_auth/actions";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";

function SignupForm() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("signInUp");

    const form = useForm({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            passwordAgain: "",
        },
    });

    async function onSubmit(values) {
        setIsLoading(true);
        const result = await signup(values);
        if (!result.success) {
            setError(result.message[locale]);
        } else {
            toast.success("Success", {
                description: result.message[locale],
                action: {
                    label: "Close",
                    onClick: () => router.push(`${locale}/auth/login`),
                },
            });
            form.reset();
        }
        setIsLoading(false);
    }

    return (
        <div>
            {error && (
                <ErrorMsg className="mb-8 text-sm text-wrap">{error}</ErrorMsg>
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 min-w-96 max-w-full"
                >
                    <div className="grid grid-cols-2 items-center gap-2">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("firstName")}: </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={t("firstName")}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("lastName")}: </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={t("lastName")}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("userName")}: </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t("userName")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("email")}: </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder={t("email")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("pass")}: </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder={t("pass")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="passwordAgain"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("re-pass")}: </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder={t("re-pass")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitBtn
                        isLoading={isLoading}
                        btnClass="primary-btn w-full"
                    >
                        {t("signup")}
                    </SubmitBtn>
                </form>
            </Form>
        </div>
    );
}

export default SignupForm;
