"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import porductPlaceHolder from "@/public/product-placeholder.png";
import PromoCode from "@/src/app/_components/cart/PromoCode";
import BuyNowBtn from "@/src/app/_components/shared/BuyNowBtn";
import FormattedPrice from "@/src/app/_components/shared/FormattedPrice";
import { useAuth } from "@/src/app/_context/AuthContext";
import { useCart } from "@/src/app/_context/CartContext";
import SpinnerIcon from "@/src/app/_components/shared/SpinnerIcon";
import { CalcOrderSummary } from "@/src/app/_utils/helper";

function CartSummary({ selectedCartItems, promoCode }) {
    const t = useTranslations("cart");

    const { user, currencyRate } = useAuth();

    const { setOrderSummary } = useCart();

    const {
        itemsPrice,
        discountAmount,
        itemsPriceAfterDiscount,
        shippingCost,
        chargeAmount,
    } = CalcOrderSummary(selectedCartItems, currencyRate, promoCode);

    useEffect(() => {
        setOrderSummary((prevOrderSummary) => ({
            ...prevOrderSummary,
            itemsPrice,
            discountAmount,
            itemsPriceAfterDiscount,
            shippingCost,
            chargeAmount,
        }));
    }, [
        itemsPrice,
        discountAmount,
        itemsPriceAfterDiscount,
        shippingCost,
        chargeAmount,
    ]);

    return (
        <div className="bg-bg-100 p-8 rounded-md row-span-1">
            <h2 className="font-semibold text-xl">{t("summary")}</h2>

            {!selectedCartItems || !selectedCartItems?.length ? (
                <p className="m-2 text-center">{t("startSelecting")}</p>
            ) : !itemsPrice || !chargeAmount ? (
                <SpinnerIcon className="mx-auto" />
            ) : (
                <>
                    <div className="my-4 flex items-center gap-2">
                        {selectedCartItems?.map((item) => (
                            <div
                                key={item.id}
                                className="w-15 aspect-square relative border border-bg-200 rounded-md"
                            >
                                {item && (
                                    <Image
                                        src={
                                            item.inventory?.variant.images[0] ||
                                            porductPlaceHolder.src
                                        }
                                        alt={
                                            item.inventory?.size ||
                                            "product image"
                                        }
                                        fill
                                        className="object-contain p-1"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 items-center justify-between mb-4">
                        <p className="text-sm text-text-300">
                            {t("itemsTotal")}:
                        </p>
                        <p className="w-fit ml-auto">
                            <FormattedPrice value={itemsPrice} />
                        </p>

                        {user && <PromoCode promoCode={promoCode} />}

                        {promoCode && (
                            <>
                                <p className="text-sm text-text-300 my-2">
                                    {t("itemsDiscount")}:
                                </p>
                                <p className="w-fit ml-auto text-red-custom-100 my-2">
                                    &minus;
                                    <FormattedPrice value={discountAmount} />
                                </p>

                                <p className="font-semibold">
                                    {t("subtotal")}:
                                </p>
                                <p className="w-fit ml-auto">
                                    <FormattedPrice
                                        value={itemsPriceAfterDiscount}
                                    />
                                </p>
                            </>
                        )}

                        <p className="font-semibold my-3">{t("shipping")}:</p>
                        <p className="w-fit ml-auto my-3">
                            {shippingCost === 0 ? t("free") : shippingCost}
                        </p>

                        <p className="font-semibold text-lg">
                            {t("estimatedTotal")}:
                        </p>
                        <p className="w-fit ml-auto text-xl font-semibold">
                            <FormattedPrice value={chargeAmount} />
                        </p>
                    </div>

                    <BuyNowBtn selectedCartItems={selectedCartItems} />
                </>
            )}
        </div>
    );
}

export default CartSummary;
