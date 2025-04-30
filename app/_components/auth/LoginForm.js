"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { login } from "@/app/auth/actions";
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
import SubmitBtn from "./SubmitBtn";

function LoginForm() {
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "gogo.2019hhh@gmail.com",
            password: "123456",
        },
    });

    return (
        <Form {...form}>
            <form className="space-y-8 min-w-96" action={login}>
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
                <SubmitBtn loadingLabel="Loggin in...">Log in</SubmitBtn>
            </form>
        </Form>
    );
}

export default LoginForm;
