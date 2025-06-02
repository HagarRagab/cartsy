"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { contactFormSchema } from "@/src/app/_lib/validation";
import { Button } from "@/src/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { useTranslations } from "use-intl";

function ContactForm() {
    const form = useForm({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            message: "",
        },
    });

    const t = useTranslations("contact");

    function onSubmit(values) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 items-center gap-2">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("firstName")}</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-bg-100"
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
                                <FormLabel>{t("lastName")}</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-bg-100"
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("email")}</FormLabel>
                            <FormControl>
                                <Input
                                    className="bg-bg-100"
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
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("phoneNumber")}</FormLabel>
                            <FormControl>
                                <Input
                                    className="bg-bg-100"
                                    placeholder={t("phoneNumber")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("message")}</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="bg-bg-100"
                                    placeholder={`${t("message")}...`}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="cursor-pointer bg-bg-700">
                    {t("submit")}
                </Button>
            </form>
        </Form>
    );
}

export default ContactForm;
