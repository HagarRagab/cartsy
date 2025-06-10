"use client";

import { ShoppingBag } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { checkoutAction } from "@/src/app/_lib/actions";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

function BuyNowBtn({ selectedCartItems }) {
    const t = useTranslations("general");
    const locale = useLocale();

    return (
        <form className="mx-auto my-1 w-full max-w-96">
            <input
                type="hidden"
                name="items"
                value={JSON.stringify(selectedCartItems)}
            />
            <Link
                className="primary-btn w-full flex items-center justify-center gap-2 px-4 py-2 text-sm"
                type="submit"
                href={`/${locale}/checkout`}
            >
                <ShoppingBag size={20} />
                <span>{t("buyBtn")}</span>
            </Link>
        </form>
    );
}

export default BuyNowBtn;
