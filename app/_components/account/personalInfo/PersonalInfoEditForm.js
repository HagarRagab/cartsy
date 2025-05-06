"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import AddressInput from "@/app/_components/account/personalInfo/AddressInput";
import SelectBox from "@/app/_components/shared/SelectBox";
import SelectCountry from "@/app/_components/account/personalInfo/SelectCountry";
import DatePicker from "@/app/_components/shared/DatePicker";
import SubmitBtn from "@/app/_components/shared/SubmitBtn";
import { updateProfileAction } from "@/app/_lib/actions";
import { infoFormSchema } from "@/app/_lib/validation";
import { countries, currencies, phoneCodes } from "@/app/_utils/helper";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function PersonalInfoEditForm({ user }) {
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
        language = "en",
    } = user;

    const form = useForm({
        resolver: zodResolver(infoFormSchema),
        defaultValues: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneCode: phoneNumber?.split(" ")[0] || "",
            phoneNumber: phoneNumber?.split(" ")[1] || "",
            dateOfBirth: new Date(dateOfBirth),
            currency: currency || "",
            country: country || "",
            address: address || "",
            city: city || "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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

        const result = await updateProfileAction(newData, "/account");

        if (!result.success) {
            toast.error("Event has not been created", {
                description: result.message,
                action: {
                    label: "Close",
                    onClick: () => router.push("/error"),
                },
            });
        } else {
            toast.success("Event has been created", {
                description: result.message,
                action: {
                    label: "Close",
                    onClick: () => router.push("/account"),
                },
            });
        }

        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-bg-100"
                                        placeholder="First Name"
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
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-bg-100"
                                        placeholder="Last Name"
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-bg-100"
                                        placeholder="Email"
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
                        label="currency"
                        items={currencies}
                        className="flex flex-col overflow-hidden"
                    />
                    <SelectCountry
                        form={form}
                        label="Country"
                        items={countries}
                        className="flex flex-col overflow-hidden"
                    />
                    <div className="grid grid-cols-[70px_1fr] gap-1">
                        <SelectBox
                            form={form}
                            name="phoneCode"
                            label="Code"
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
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-bg-100"
                                            placeholder="Phone Number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <AddressInput form={form} language={language} />
                </div>
                <SubmitBtn
                    label="Save"
                    loadingLabel="Updating..."
                    isLoading={isLoading}
                    btnClass="w-30 cursor-pointer float-end"
                />
            </form>
        </Form>
    );
}

export default PersonalInfoEditForm;
