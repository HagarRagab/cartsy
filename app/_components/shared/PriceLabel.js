"use client";

function PriceLabel({
    price,
    productCurrency,
    userCurrency,
    currencyRate,
    discount,
    isDiscountValid,
}) {
    const priceInUserCurrency = !currencyRate
        ? price
        : currencyRate.quotes[`${productCurrency}${userCurrency}`] * price;

    const priceWithoutDiscount = `${priceInUserCurrency.toFixed(
        2
    )} ${userCurrency}`;

    let priceAfterDiscount;
    if (isDiscountValid) {
        const discountAmount = (priceInUserCurrency * discount) / 100;
        priceAfterDiscount = `${(priceInUserCurrency - discountAmount).toFixed(
            2
        )} ${userCurrency}`;
    }

    return (
        <>
            {discount && isDiscountValid ? (
                <span>
                    <span className="uppercase font-bold text-accent-200 mr-2">
                        {priceAfterDiscount}
                    </span>
                    <span className="text-md line-through text-red-custom-100 font-light text-sm">
                        {priceWithoutDiscount}
                    </span>
                    <span className="text-sm ml-2 text-text-400">
                        &minus;{discount}%
                    </span>
                </span>
            ) : (
                <span className="uppercase font-bold  text-lg text-accent-200 ml-1">
                    {priceWithoutDiscount}
                </span>
            )}
        </>
    );
}

export default PriceLabel;
