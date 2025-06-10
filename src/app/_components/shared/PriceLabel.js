"use client";

import SpinnerIcon from "@/src/app/_components/shared/SpinnerIcon";
import { useAuth } from "@/src/app/_context/AuthContext";
import FormattedPrice from "@/src/app/_components/shared/FormattedPrice";

function PriceLabel({ price, discount, isDiscountValid }) {
    const { currencyRate, loadingCurrencyRate } = useAuth();

    if (loadingCurrencyRate) return <SpinnerIcon />;

    const priceInUserCurrency = !currencyRate ? price : currencyRate * price;

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
                            <FormattedPrice value={priceInUserCurrency} />
                        </span>
                        <span className="text-sm text-text-400">
                            &minus;{discount}%
                        </span>
                    </p>
                    <p className="uppercase font-bold text-accent-200 mr-2">
                        <FormattedPrice value={priceAfterDiscount} />
                    </p>
                </div>
            ) : (
                <span className="flex items-center uppercase font-bold  text-lg text-accent-200 ml-1">
                    <FormattedPrice value={priceInUserCurrency} />
                </span>
            )}
        </>
    );
}

export default PriceLabel;
