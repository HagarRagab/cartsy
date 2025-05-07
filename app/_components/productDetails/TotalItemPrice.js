"use client";

import Counter from "@/app/_components/productDetails/Counter";
import PriceLabel from "@/app/_components/shared/PriceLabel";
import { useSearchParams } from "next/navigation";

function TotalItemPrice({
    stock,
    price,
    discount,
    isDiscountValid,
    productCurrency,
    userCurrency,
    currencyRate,
}) {
    const searchParams = useSearchParams();
    const quantity = Number(searchParams.get("quantity")) || 1;

    return (
        <>
            <div className="mt-4 flex items-center gap-2">
                <Counter stock={stock} />
                <div>
                    <span className="text-text-400 mr-1">Stock:</span>
                    <span className="uppercase font-semibold text-md">
                        {stock}
                    </span>
                </div>
            </div>
            <div className="py-4 border-b-2 border-text-600">
                <span className="text-text-400 mr-1">Total price:</span>
                <PriceLabel
                    price={price}
                    discount={discount?.percentage}
                    isDiscountValid={isDiscountValid}
                    productCurrency={productCurrency}
                    userCurrency={userCurrency}
                    currencyRate={currencyRate}
                    quantity={quantity}
                />
            </div>
        </>
    );
}

export default TotalItemPrice;
