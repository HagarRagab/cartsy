"use client";

import Image from "next/image";

import porductPlaceHolder from "@/public/product-placeholder.png";
import { useAuth } from "@/src/app/_context/AuthContext";
import FormattedPrice from "../shared/FormattedPrice";
import { useTranslations } from "use-intl";

function CheckoutSummary({
    selectedCartItems,
    itemsPrice,
    itemsPriceAfterDiscount,
    shippingCost,
    discountAmount,
}) {
    const { currencyRate } = useAuth();
    const t = useTranslations("placeOrder");

    return (
        <div className="col-span-full lg:col-span-1 bg-bg-100 p-8 rounded-md row-span-1">
            <h2 className="font-semibold text-xl">{t("yourOrder")}</h2>

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
                            <p className="text-sm flex items-center gap-2">
                                <span>{t("size")}:</span>
                                <span
                                    className="ml-1 font-semibold"
                                    title={item.inventory.size}
                                >
                                    {item.inventory.size}
                                </span>
                            </p>
                            <p className="text-sm flex items-center gap-2">
                                <span>{t("color")}:</span>
                                <span
                                    className="inline-block max-w-20 ml-1 font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap"
                                    title={item.inventory.variant.color}
                                >
                                    {item.inventory.variant.color}
                                </span>
                            </p>
                            <p className="text-sm col-span-full flex items-center gap-2">
                                <span>{t("price")}:</span>
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

            <hr />

            <div className="grid grid-cols-2 items-center justify-between my-4">
                <p className="text-sm text-text-300">{t("itemsTotal")}:</p>
                <p className="w-fit ml-auto">
                    <FormattedPrice value={itemsPrice} />
                </p>

                {discountAmount !== 0 && (
                    <>
                        <p className="text-sm text-text-300 my-2">
                            {t("itemsDiscount")}:
                        </p>
                        <p className="w-fit ml-auto text-red-custom-100 my-2">
                            &minus;
                            <FormattedPrice value={discountAmount} />
                        </p>

                        <p className="font-semibold">{t("subtotal")}:</p>
                        <p className="w-fit ml-auto">
                            <FormattedPrice value={itemsPriceAfterDiscount} />
                        </p>
                    </>
                )}

                <p className="font-semibold my-3">{t("shipping")}:</p>
                <p className="w-fit ml-auto my-3">
                    {shippingCost === 0 ? t("free") : shippingCost}
                </p>

                <p className="font-semibold text-lg">{t("estimatedTotal")}:</p>
                <p className="w-fit ml-auto text-xl font-semibold">
                    <FormattedPrice
                        value={itemsPriceAfterDiscount + shippingCost}
                    />
                </p>
            </div>
        </div>
    );
}

export default CheckoutSummary;
