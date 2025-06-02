"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import SelectBox from "@/src/app/_components/shared/SelectBox";
import { purchaseInfoFormSchema } from "@/src/app/_lib/validation";
import { phoneCodes } from "@/src/app/_utils/utils";
import { Button } from "@/src/components/ui/button";
import { DialogFooter } from "@/src/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { countries } from "@/src/app/_utils/utils";
import AddressInput from "@/src/app/_components/shared/AddressInput";
import SelectCountry from "@/src/app/_components/shared/SelectCountry";

function PurchaseContactForm({ user }) {
    const form = useForm({
        resolver: zodResolver(purchaseInfoFormSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneCode: user.phoneNumber?.split(" ")[0] || "",
            phoneNumber: user.phoneNumber?.split(" ")[1] || "",
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    <div className="col-span-full grid grid-cols-[70px_1fr] gap-4">
                        <SelectCountry
                            form={form}
                            label="Country"
                            items={countries}
                            className="flex flex-col overflow-hidden"
                        />
                        <AddressInput form={form} />
                    </div>

                    <div className="col-span-full grid grid-cols-[70px_1fr] gap-4">
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
                </div>

                <DialogFooter>
                    <Button type="submit" className="primary-btn w-full">
                        Update
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}

export default PurchaseContactForm;
