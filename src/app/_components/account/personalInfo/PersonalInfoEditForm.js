"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";

import AddressInput from "@/src/app/_components/shared/AddressInput";
import SelectBox from "@/src/app/_components/shared/SelectBox";
import SelectCountry from "@/src/app/_components/shared/SelectCountry";
import DatePicker from "@/src/app/_components/shared/DatePicker";
import SubmitBtn from "@/src/app/_components/shared/SubmitBtn";
import { updateProfileAction } from "@/src/app/_lib/actions";
import { infoFormSchema } from "@/src/app/_lib/validation";
import { countries, currencies, phoneCodes } from "@/src/app/_utils/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";

function PersonalInfoEditForm({ user, path, onOpenChange }) {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth,
        currency,
        country,
        address,
        city,
    } = user;

    const form = useForm({
        resolver: zodResolver(infoFormSchema),
        defaultValues: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneCode: phoneNumber?.split(" ")[0] || "",
            phoneNumber: phoneNumber?.split(" ")[1] || "",
            dateOfBirth: dateOfBirth && new Date(dateOfBirth),
            currency: currency || "",
            country: country || "",
            address: address || "",
            city: city || "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    const t = useTranslations("personalInfo");

    const locale = useLocale();

    async function onSubmit(values) {
        setIsLoading(true);

        const newData = {
            firstName: values.firstName,
            lastName: values.lastName,
            dateOfBirth: new Date(values.dateOfBirth),
            phoneNumber: values.phoneCode + " " + values.phoneNumber,
            currency: values.currency,
            country: values.country,
            address: values.address,
            city: values.city,
        };

        const result = await updateProfileAction(newData, `/${locale}/${path}`);

        if (!result.success) {
            toast.error("Failed", {
                description: result.message[locale],
            });
        } else {
            toast.success("Success", {
                description: result.message[locale],
            });
        }

        setIsLoading(false);

        if (path === "/checkout") onOpenChange(false);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                        type="email"
                                        disabled
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DatePicker form={form} />

                    <SelectBox
                        form={form}
                        name="currency"
                        label={t("currency")}
                        items={currencies}
                        className="flex flex-col overflow-hidden"
                    />
                    <SelectCountry
                        form={form}
                        label={t("country")}
                        items={countries}
                        className="flex flex-col overflow-hidden"
                    />
                    <div className="grid grid-cols-[90px_1fr] gap-1">
                        <SelectBox
                            form={form}
                            name="phoneCode"
                            label={t("code")}
                            items={phoneCodes}
                            className="flex flex-col overflow-hidden"
                        >
                            Code
                        </SelectBox>
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
                    </div>
                    <AddressInput form={form} />
                </div>
                <SubmitBtn
                    isLoading={isLoading}
                    btnClass="primary-btn w-30 cursor-pointer float-end"
                >
                    {t("save")}
                </SubmitBtn>
            </form>
        </Form>
    );
}

export default PersonalInfoEditForm;
