"use client";

import { updatePasswordSchema } from "@/src/app/_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner";
import { redirect, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

import SubmitBtn from "@/src/app/_components/shared/SubmitBtn";
import { updatePassword } from "@/src/app/_auth/actions";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import ErrorMsg from "@/src/app/_components/shared/ErrorMsg";

function UpdatePasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const searchParams = useSearchParams();
    const locale = useLocale();

    const form = useForm({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            password: "",
            passwordAgain: "",
        },
    });

    async function onSubmit(values) {
        setIsLoading(true);
        const result = await updatePassword(values, searchParams.get("code"));
        setIsLoading(false);
        if (result.status === "failed") setError(result.message[locale]);
        else {
            toast(result.message[locale], {
                description: result.message[locale],
            });
            form.reset();
            redirect("/auth/login");
        }
    }

    return (
        <>
            {error && (
                <div className="mb-8 text-center">
                    <ErrorMsg className="text-sm">{error}</ErrorMsg>
                    <Link
                        href={`/${locale}/auth/login`}
                        className="hover:underline hover:text-red-custom-100 transition-all text-red-custom-200 text-sm"
                    >
                        &lt; Go back to login page
                    </Link>
                </div>
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 min-w-96"
                >
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password:</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="New password"
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
                                <FormLabel>Re-enter password:</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Re-enter password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitBtn btnClass="w-full" isLoading={isLoading}>
                        Reset password
                    </SubmitBtn>
                </form>
            </Form>
        </>
    );
}

export default UpdatePasswordForm;
