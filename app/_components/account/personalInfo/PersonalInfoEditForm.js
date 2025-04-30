"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import DatePicker from "@/app/_components/shared/DatePicker";
import SelectBox from "@/app/_components/shared/SelectBox";
import { contactFormSchema } from "@/app/_lib/validation";
import { countries, currencies, phoneCodes } from "@/app/_utils/helper";
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
import AddressInput from "./AddressInput";

function PersonalInfoEditForm({ user }) {
    const form = useForm({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber || "",
            dateOfBirth: user.dateOfBirth || "",
            currency: user.currency || "",
            country: user.country || "",
            address: user.address || "",
        },
    });

    function onSubmit(values) {
        console.log(values);
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
                    <div className="grid grid-cols-[70px_1fr] gap-1">
                        <SelectBox name="code" form={form} items={phoneCodes}>
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
                    <SelectBox name="currency" form={form} items={currencies}>
                        Currency
                    </SelectBox>
                    <SelectBox name="country" form={form} items={countries}>
                        Country
                    </SelectBox>
                    <AddressInput form={form} />
                </div>
                <Button
                    type="submit"
                    className="w-20 cursor-pointer float-end primary-btn"
                >
                    Save
                </Button>
            </form>
        </Form>
    );
}

export default PersonalInfoEditForm;
