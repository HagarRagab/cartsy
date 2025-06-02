"use client";

import { forgotPasswordSchema } from "@/src/app/_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import { useLocale } from "next-intl";

import SubmitBtn from "@/src/app/_components/shared/SubmitBtn";
import { forgotPassword } from "@/src/app/_auth/actions";
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

function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const locale = useLocale();

    const form = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values) {
        setIsLoading(true);
        const result = await forgotPassword(values);
        setIsLoading(false);
        if (result.status === "failed") setError(result.message[locale]);
        else {
            toast("Successfully sent email", {
                description: result.message[locale],
            });
            form.reset();
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email:</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. username@cartsy.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitBtn btnClass="w-full" isLoading={isLoading}>
                        Send email
                    </SubmitBtn>
                </form>
            </Form>
        </>
    );
}

export default ForgotPasswordForm;
