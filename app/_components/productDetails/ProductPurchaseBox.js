"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

import AddToCart from "@/app/_components/cart/AddToCart";
import Counter from "@/app/_components/shared/Counter";
import ItemActionBtn from "@/app/_components/shared/ItemActionBtn";
import PriceLabel from "@/app/_components/shared/PriceLabel";

function ProductPurchaseBox({
    inventory,
    discount,
    isDiscountValid,
    userCurrency,
    currencyRate,
    userCart,
    selectedInventoryId,
}) {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => setQuantity(1), [selectedInventoryId]);

    return (
        <>
            <div className="mt-4 flex items-center gap-2">
                <Counter
                    stock={inventory.stock}
                    quantity={quantity}
                    setQuantity={setQuantity}
                />
                <div>
                    <span className="text-text-400 mr-1">Stock:</span>
                    <span className="uppercase font-semibold text-md">
                        {inventory.stock}
                    </span>
                </div>
            </div>

            <div className="py-4 border-b-2 border-text-600">
                <span className="text-text-400 mr-1">Price:</span>
                <PriceLabel
                    price={inventory.price}
                    discount={discount?.percentage}
                    isDiscountValid={isDiscountValid}
                    productCurrency={inventory.currency}
                    userCurrency={userCurrency}
                    currencyRate={currencyRate}
                />
            </div>

            <div className="border-b-2 border-text-600 py-4">
                <ItemActionBtn
                    icon={<ShoppingBag />}
                    label="Buy now"
                    style="primary-btn"
                />

                <AddToCart
                    userCart={userCart}
                    selectedInventoryId={selectedInventoryId}
                    quantity={quantity}
                />
            </div>
        </>
    );
}

export default ProductPurchaseBox;
