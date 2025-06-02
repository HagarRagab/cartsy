"use client";

import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";

import { checkoutAction } from "@/src/app/_lib/actions";
import { Button } from "@/src/components/ui/button";

function BuyNowBtn({ selectedCartItems }) {
    const t = useTranslations("general");

    return (
        <form className="mx-auto my-1 w-full max-w-96" action={checkoutAction}>
            <input
                type="hidden"
                name="items"
                value={JSON.stringify(selectedCartItems)}
            />
            <Button
                className="primary-btn w-full flex items-center justify-center gap-2 px-4 py-2 text-sm"
                type="submit"
            >
                <ShoppingBag size={20} />
                <span>{t("buyBtn")}</span>
            </Button>
        </form>
    );
}

export default BuyNowBtn;
