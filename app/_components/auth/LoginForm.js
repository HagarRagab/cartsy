"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";

import { login } from "@/app/auth/actions";
import { redirect } from "next/dist/server/api-utils";
import { loginFormSchema } from "@/app/_lib/validation";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ErrorMsg from "@/app/_components/shared/ErrorMsg";
import SubmitBtn from "@/app/_components/shared/SubmitBtn";
import { useRouter } from "next/navigation";

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
        <Form {...form}>
            {loginError && <ErrorMsg>{loginError}</ErrorMsg>}
            <form
                className="space-y-8 min-w-96"
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
                <Button
                    variant="ghost"
                    className="w-full justify-end relative -top-8 hover:underline transition-all mb-0 cursor-pointer text-sm text-text-400 pr-0 pb-0"
                >
                    Forgot password?
                </Button>
                <SubmitBtn
                    label="Log in"
                    loadingLabel="Logging in..."
                    isLoading={isLoading}
                    btnClass="w-full"
                />
            </form>
        </Form>
    );
}

export default LoginForm;
