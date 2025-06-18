"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";

import AddToCart from "@/src/app/_components/cart/AddToCart";
import Counter from "@/src/app/_components/shared/Counter";
import PriceLabel from "@/src/app/_components/shared/PriceLabel";

function ProductPurchaseBox({
    inventory,
    discount,
    isDiscountValid,
    selectedInventoryId,
}) {
    const [quantity, setQuantity] = useState(1);

    const t = useTranslations("productDetails");

    useEffect(() => setQuantity(1), [selectedInventoryId]);

    return (
        <>
            <div className="mt-4 flex items-center gap-2">
                <Counter
                    stock={inventory.stock}
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                />
                <div className="flex items-center gap-2">
                    <span className="text-text-400 mr-1">{t("stock")}:</span>
                    <span className="uppercase font-semibold text-base">
                        {inventory.stock}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4 py-4 border-b-2 border-text-600">
                <span className="text-text-400 mr-1">{t("price")}:</span>
                <PriceLabel
                    price={inventory.price}
                    discount={discount?.percentage}
                    isDiscountValid={isDiscountValid}
                />
            </div>

            {
                <div className="flex flex-col gap-1 border-b-2 border-text-600 py-4">
                    <AddToCart
                        inventoryId={selectedInventoryId}
                        quantity={quantity}
                        className="outline-btn w-full max-w-96 mx-auto"
                    >
                        <ShoppingCart size={20} />{" "}
                        <span>{t("addCartBtn")}</span>
                    </AddToCart>
                </div>
            }
        </>
    );
}

export default ProductPurchaseBox;
