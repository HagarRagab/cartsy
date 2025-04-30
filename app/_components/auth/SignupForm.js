"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import ErrorMsg from "@/app/_components/shared/ErrorMsg";
import { signupFormSchema } from "@/app/_lib/validation";
import { signup } from "@/app/auth/actions";
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

function SignupForm() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            firstName: "Hagar",
            lastName: "Ragab",
            userName: "hagarragab108",
            email: "gogo.2019hhh@gmail.com",
            password: "123456",
            passwordAgain: "123456",
        },
    });

    async function onSubmit(values) {
        setIsLoading(true);
        const result = await signup(values);
        if (result.success === false) setError(result.message);
        else {
            toast(result.message, {
                action: {
                    label: "Undo",
                },
            });
            redirect("/auth/login");
        }
        setIsLoading(false);
    }

    return (
        <div>
            {error && <ErrorMsg>{error}</ErrorMsg>}
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
                                    <FormLabel>FirstName: </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="FirstName"
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
                                    <FormLabel>LastName: </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="LastName"
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
                                <FormLabel>UserName: </FormLabel>
                                <FormControl>
                                    <Input placeholder="UserName" {...field} />
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
                                <FormLabel>Email: </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Email"
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
                    <FormField
                        control={form.control}
                        name="passwordAgain"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Re-write password: </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Re-write password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className={`primary-btn w-full`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing up..." : "Sign up"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default SignupForm;
