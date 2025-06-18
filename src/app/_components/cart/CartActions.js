"use client";

import { useOptimistic, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Minus, Trash } from "lucide-react";

import ConfirmAction from "@/src/app/_components/shared/ConfirmAction";
import Counter from "@/src/app/_components/shared/Counter";
import PlusMinusBtn from "@/src/app/_components/shared/PlusMinusBtn";
import {
    removeCartItemAction,
    updateCartItemQuantity,
} from "@/src/app/_lib/actions";
import { Button } from "@/src/components/ui/button";
import LikeProduct from "@/src/app/_components/productDetails/LikeProduct";
import SpinnerIcon from "../shared/SpinnerIcon";

function CartActions({
    inventory,
    initQuantity,
    cartItemId,
    product,
    userId,
    likedProduct,
}) {
    const locale = useLocale();
    const t = useTranslations("cart");
    const [isLoading, setIsLoading] = useState(false);

    const [, startTransition] = useTransition();
    const [optimisticQuantity, optimisticUpdateQuantity] = useOptimistic(
        initQuantity,
        (_, newQuantity) => newQuantity
    );

    async function updateCartQuantity(quantity) {
        startTransition(async () => {
            try {
                optimisticUpdateQuantity(quantity);
                await updateCartItemQuantity(
                    cartItemId,
                    inventory.id,
                    quantity
                );
            } catch (error) {
                console.error("Cannot update quantity");
            }
        });
    }

    async function handleRemovingCartItem() {
        setIsLoading(true);
        const result = await removeCartItemAction(cartItemId);
        setIsLoading(false);
        toast(result.message[locale]);
    }

    return (
        <div className="md:h-full flex md:flex-col items-end justify-end gap-4 md:justify-between row-start-2 md:row-start-1 md:col-start-3">
            <div className="flex items-center gap-2">
                <LikeProduct
                    productId={product.id}
                    userId={userId}
                    likedProduct={likedProduct}
                    btnStyle="ghost-btn"
                />

                <ConfirmAction
                    onConfirm={handleRemovingCartItem}
                    btnStyle="ghost-btn"
                    message={t("deleteMsg")}
                >
                    {isLoading ? (
                        <SpinnerIcon />
                    ) : (
                        <Button
                            variant="ghost"
                            className="hover:bg-transparent"
                        >
                            <Trash size={17} />
                        </Button>
                    )}
                </ConfirmAction>
            </div>
            <Counter
                stock={inventory.stock}
                quantity={optimisticQuantity}
                onQuantityChange={updateCartQuantity}
            >
                <ConfirmAction
                    onConfirm={handleRemovingCartItem}
                    btnStyle="bg-transparent cursor-pointer shadow-none text-text-100 hover:bg-bg-200"
                    message="This action cannot be undone. This will permanently delete this item."
                >
                    <PlusMinusBtn icon={<Minus size={10} />} />
                </ConfirmAction>
            </Counter>
        </div>
    );
}

export default CartActions;
