"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";

import GoogleLogin from "@/src/app/_components/auth/GoogleLogin";
import ErrorMsg from "@/src/app/_components/shared/ErrorMsg";
import SubmitBtn from "@/src/app/_components/shared/SubmitBtn";
import ForgotPasswordBtn from "@/src/app/_components/auth/ForgotPasswordBtn";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { loginFormSchema } from "@/src/app/_lib/validation";
import { login } from "@/src/app/_auth/actions";
import { useTranslations } from "use-intl";

function LoginForm() {
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "rohipa8233@eduhed.com",
            password: "123456",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    const t = useTranslations("signInUp");

    async function onSubmit(values) {
        setIsLoading(true);
        const logingUser = await login(values);
        setIsLoading(false);
        if (!logingUser.success) setLoginError(logingUser.message);
        else redirect("/");
    }

    return (
        <>
            {loginError && <ErrorMsg className="mb-8">{loginError}</ErrorMsg>}
            <Form {...form}>
                <form
                    className="space-y-4 min-w-96"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("email")}: </FormLabel>
                                <FormControl>
                                    <Input
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
                    <ForgotPasswordBtn />
                    <SubmitBtn
                        isLoading={isLoading}
                        btnClass="primary-btn w-full"
                    >
                        {t("login")}
                    </SubmitBtn>
                </form>
            </Form>
            <div
                className={`relative my-8 before:min-w-96 before:h-[0.5px] before:bg-primary-200 before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 after:px-4 after:content-['${t(
                    "or"
                )}'] after:bg-bg-100 after:absolute after:top-1/2 after:left-1/2 after:-translate-1/2 after:text-sm`}
            />
            <GoogleLogin />
        </>
    );
}

export default LoginForm;
