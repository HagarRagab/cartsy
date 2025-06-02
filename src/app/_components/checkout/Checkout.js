"use client";

import Image from "next/image";

import { useAuth } from "@/src/app/_context/AuthContext";
import porductPlaceHolder from "@/public/product-placeholder.png";
import { useLocalStorage } from "@/src/app/_hooks/useLocalStorage";

function Checkout({ selectedCartItems }) {
    const { settings } = useAuth();
    const { storedValue: appliedPromo } = useLocalStorage("appliedPromo", null);

    const itemsTotalPrice = selectedCartItems?.reduce(
        (total, cur) =>
            total + Number(cur.inventory?.price) * Number(cur.quantity),
        0
    );

    const promoCodeValue =
        appliedPromo?.discount_type === "percentage"
            ? (itemsTotalPrice * appliedPromo?.value) / 100
            : appliedPromo?.value;

    return (
        <div className="bg-bg-100 p-8 rounded-md row-span-1">
            <h2 className="font-semibold text-xl">You order</h2>

            <div className="my-4 flex flex-col gap-2">
                {selectedCartItems?.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
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
                                Size:
                                <span className="ml-1 font-semibold">
                                    {item.inventory.size}
                                </span>
                            </p>
                            <p className="text-sm">
                                Color:
                                <span className="ml-1 font-semibold">
                                    {item.inventory.variant.color}
                                </span>
                            </p>
                            <p className="text-sm">
                                Price:
                                <span className="mx-1 font-semibold text-base">
                                    {item.inventory.price}
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
                    {itemsTotalPrice.toString()} {settings.currency}
                </p>

                {appliedPromo && (
                    <>
                        <p className="text-sm text-text-300 my-2">
                            Items discount:
                        </p>
                        <p className="w-fit ml-auto text-red-custom-100 my-2">
                            &minus; {promoCodeValue} {settings.currency}
                        </p>

                        <p className="font-semibold">Subtotal:</p>
                        <p className="w-fit ml-auto">
                            {itemsTotalPrice - promoCodeValue}{" "}
                            {settings.currency}
                        </p>
                    </>
                )}

                <p className="font-semibold my-3">Shipping:</p>
                <p className="w-fit ml-auto my-3">Free</p>

                <p className="font-semibold text-lg">Estimated total:</p>
                <p className="w-fit ml-auto text-xl font-semibold">
                    {appliedPromo
                        ? itemsTotalPrice - promoCodeValue
                        : itemsTotalPrice}{" "}
                    {settings.currency}
                </p>
            </div>
        </div>
    );
}

export default Checkout;
