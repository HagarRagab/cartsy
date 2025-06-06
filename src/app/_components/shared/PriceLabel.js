"use client";

import { useEffect, useState } from "react";
import { useFormatter } from "next-intl";

import { useAuth } from "@/src/app/_context/AuthContext";
import { convertCurrency } from "@/src/app/_utils/helper";
import SpinnerIcon from "@/src/app/_components/shared/SpinnerIcon";

function PriceLabel({ price, productCurrency, discount, isDiscountValid }) {
    const { settings } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [currencyRate, setCurrencyRate] = useState(null);
    const format = useFormatter();

    function formatCurrency(value) {
        const formattedValue = format.number(value, {
            numberingSystem: "latn",
            style: "currency",
            currency: settings.currency,
        });
        return formattedValue;
    }

    useEffect(() => {
        async function getCurrencyRate() {
            if (settings.currency === productCurrency) return;
            setIsLoading(true);
            const rate = await convertCurrency(
                productCurrency,
                settings.currency
            );
            setCurrencyRate(
                rate.quotes?.[`${productCurrency}${settings.currency}`]
            );
            setIsLoading(false);
        }

        getCurrencyRate();
    }, [productCurrency, settings.currency]);

    if (isLoading) return <SpinnerIcon />;

    const priceInUserCurrency = !currencyRate ? price : currencyRate * price;

    const priceWithoutDiscount = priceInUserCurrency.toFixed(2);

    let priceAfterDiscount;
    if (isDiscountValid) {
        const discountAmount = (priceInUserCurrency * discount) / 100;
        priceAfterDiscount = (priceInUserCurrency - discountAmount).toFixed(2);
    }

    return (
        <>
            {discount && isDiscountValid ? (
                <div>
                    <p className="flex items-end gap-3">
                        <span className="text-base line-through text-red-custom-100 font-light mt-2">
                            {formatCurrency(priceWithoutDiscount)}
                        </span>
                        <span className="text-sm text-text-400">
                            &minus;{discount}%
                        </span>
                    </p>
                    <p className="uppercase font-bold text-accent-200 mr-2">
                        {formatCurrency(priceAfterDiscount)}
                    </p>
                </div>
            ) : (
                <span className="flex items-center uppercase font-bold  text-lg text-accent-200 ml-1">
                    {formatCurrency(priceWithoutDiscount)}
                </span>
            )}
        </>
    );
}

export default PriceLabel;
