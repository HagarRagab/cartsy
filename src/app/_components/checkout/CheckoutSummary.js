"use client";

import Image from "next/image";

import porductPlaceHolder from "@/public/product-placeholder.png";
import { useAuth } from "@/src/app/_context/AuthContext";
import FormattedPrice from "../shared/FormattedPrice";

function CheckoutSummary({
    selectedCartItems,
    itemsTotalPrice,
    totalCartValue,
    shippingCost,
    promoCodeValue,
}) {
    const { currencyRate } = useAuth();

    return (
        <div className="col-span-full lg:col-span-1 bg-bg-100 p-8 rounded-md row-span-1">
            <h2 className="font-semibold text-xl">You order</h2>

            <div className="my-4 flex flex-col gap-4">
                {selectedCartItems?.map((item) => (
                    <div
                        key={item.id}
                        className="border-2 border-bg-200 rounded-md p-2 flex items-center gap-2"
                    >
                        <div className="w-15 aspect-square relative border border-bg-200 rounded-md">
                            <Image
                                src={
                                    item.inventory?.variant.images[0] ||
                                    porductPlaceHolder.src
                                }
                                alt={item.inventory?.size || "product image"}
                                fill
                                className="object-contain p-1"
                            />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <p className="text-sm">
                                <span>Size:</span>
                                <span className="ml-1 font-semibold">
                                    {item.inventory.size}
                                </span>
                            </p>
                            <p className="text-sm flex items-center">
                                <span>Color:</span>
                                <span className="inline-block max-w-20 ml-1 font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    {item.inventory.variant.color}
                                </span>
                            </p>
                            <p className="text-sm col-span-full">
                                Price:
                                <span className="mx-1 font-semibold text-base">
                                    <FormattedPrice
                                        value={
                                            item.inventory.price * currencyRate
                                        }
                                    />
                                </span>
                                <span>* {item.quantity}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 items-center justify-between mb-4">
                <p className="text-sm text-text-300">Items total:</p>
                <p className="w-fit ml-auto">
                    <FormattedPrice value={itemsTotalPrice} />
                </p>

                {promoCodeValue !== 0 && (
                    <>
                        <p className="text-sm text-text-300 my-2">
                            Items discount:
                        </p>
                        <p className="w-fit ml-auto text-red-custom-100 my-2">
                            &minus;
                            <FormattedPrice value={promoCodeValue} />
                        </p>

                        <p className="font-semibold">Subtotal:</p>
                        <p className="w-fit ml-auto">
                            <FormattedPrice value={totalCartValue} />
                        </p>
                    </>
                )}

                <p className="font-semibold my-3">Shipping:</p>
                <p className="w-fit ml-auto my-3">
                    {shippingCost === 0 ? "Free" : shippingCost}
                </p>

                <p className="font-semibold text-lg">Estimated total:</p>
                <p className="w-fit ml-auto text-xl font-semibold">
                    <FormattedPrice value={totalCartValue + shippingCost} />
                </p>
            </div>
        </div>
    );
}

export default CheckoutSummary;
