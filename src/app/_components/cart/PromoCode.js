"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getPromoCodeAction } from "@/src/app/_lib/actions";
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

function PromoCode({ appliedPromo, setAppliedPromo }) {
    const form = useForm({
        resolver: zodResolver(promoCodeSchema),
        defaultValues: {
            promoCode: "",
        },
    });

    async function onSubmit(values) {
        const { status, message } = await getPromoCodeAction(values.promoCode);
        if (status === "failed") return form.setError("promoCode", { message });
        else {
            setAppliedPromo(message);
            form.reset();
        }
    }

    function handleDeletePromoCode() {
        setAppliedPromo(null);
    }

    if (appliedPromo?.code)
        return (
            <div className="col-span-full border border-bg-200 rounded-md my-2 py-1 px-4 text-text-400 flex items-center justify-between">
                <span>
                    <span className="text-accent-200">
                        {appliedPromo?.code}
                    </span>{" "}
                    <span className="ml-2">applied</span>
                </span>
                <Button
                    variant="ghost"
                    className="p-0 hover:bg-transparent hover:text-text-200 cursor-pointer"
                    onClick={handleDeletePromoCode}
                >
                    Remove
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
                <Button type="submit" className="outline-btn">
                    Apply
                </Button>
            </form>
        </Form>
    );
}

export default PromoCode;
