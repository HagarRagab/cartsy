"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";

import {
    deletePromoCodeAction,
    setPromoCodeAction,
} from "@/src/app/_lib/actions";
import { promoCodeSchema } from "@/src/app/_lib/validation";
import { Button } from "@/src/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import SpinnerIcon from "@/src/app/_components/shared/SpinnerIcon";

function PromoCode({ promoCode }) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(promoCodeSchema),
        defaultValues: {
            promoCode: "",
        },
    });

    const locale = useLocale();

    async function onSubmit(values) {
        setIsLoading(true);
        const { status, message } = await setPromoCodeAction(values.promoCode);
        setIsLoading(false);
        if (status === "failed")
            return form.setError("promoCode", { message: message[locale] });
        else form.reset();
    }

    async function handleDeletePromoCode() {
        setIsLoading(true);
        await deletePromoCodeAction();
        setIsLoading(false);
    }

    if (promoCode && promoCode.code)
        return (
            <div className="col-span-full border border-bg-200 rounded-md my-2 py-1 px-4 text-text-400 flex items-center justify-between">
                <span>
                    <span className="text-accent-200">{promoCode?.code}</span>{" "}
                    <span className="ml-2">applied</span>
                </span>
                <Button
                    variant="ghost"
                    className="p-0 hover:bg-transparent hover:text-text-200 cursor-pointer"
                    onClick={handleDeletePromoCode}
                    disabled={isLoading}
                >
                    {isLoading ? <SpinnerIcon /> : "Remove"}
                </Button>
            </div>
        );

    return (
        <Form {...form}>
            <form
                className="max-w-96 col-span-full flex justify-between gap-2 my-2"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="promoCode"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input
                                    placeholder="Enter a promo code"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="outline-btn"
                    disabled={isLoading}
                >
                    {isLoading ? <SpinnerIcon /> : "Apply"}
                </Button>
            </form>
        </Form>
    );
}

export default PromoCode;
