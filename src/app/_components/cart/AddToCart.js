"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useLocale } from "next-intl";

import SubmitBtn from "@/src/app/_components/shared/SubmitBtn";
import { addToCartAction } from "@/src/app/_lib/actions";

function AddToCart({ inventoryId, quantity = 1, className, children }) {
    const [isLoading, setIsLoading] = useState(false);
    const locale = useLocale();

    async function handleAddToCart(e) {
        e.stopPropagation();
        setIsLoading(true);

        const result = await addToCartAction(quantity, inventoryId);
        toast(result.message[locale]);

        setIsLoading(false);
    }

    return (
        <SubmitBtn
            btnClass={className}
            onClick={handleAddToCart}
            isLoading={isLoading}
        >
            {children}
        </SubmitBtn>
    );
}

export default AddToCart;
