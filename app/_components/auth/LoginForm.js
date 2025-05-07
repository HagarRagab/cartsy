"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import GoogleLogin from "@/app/_components/auth/GoogleLogin";
import ErrorMsg from "@/app/_components/shared/ErrorMsg";
import SubmitBtn from "@/app/_components/shared/SubmitBtn";
import ForgotPassword from "@/app/_components/auth/ForgotPasswordBtn";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormSchema } from "@/app/_lib/validation";
import { login } from "@/app/auth/actions";

function LoginForm() {
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "gogo.2019hhh@gmail.com",
            password: "123456",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    const router = useRouter();

    async function onSubmit(values) {
        setIsLoading(true);
        const logingUser = await login(values);
        if (!logingUser.success) setLoginError(logingUser.message);
        else router.push("/");
        setIsLoading(false);
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
                                <FormLabel>Email: </FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
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
                                <FormLabel>Password: </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <ForgotPassword />
                    <SubmitBtn
                        label="Log in"
                        loadingLabel="Logging in..."
                        isLoading={isLoading}
                        btnClass="w-full"
                    />
                </form>
            </Form>
            <div className="relative my-8 before:min-w-96 before:h-[0.5px] before:bg-primary-200 before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 after:px-4 after:content-['OR'] after:bg-bg-100 after:absolute after:top-1/2 after:left-1/2 after:-translate-1/2 after:text-sm" />
            <GoogleLogin />
        </>
    );
}

export default LoginForm;
