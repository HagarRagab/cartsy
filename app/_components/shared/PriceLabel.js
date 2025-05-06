"use client";

function PriceLabel({
    price,
    productCurrency,
    userCurrency,
    currencyRate,
    discount,
    isDiscountValid,
    quantity = 1,
}) {
    const priceInUserCurrency = !currencyRate
        ? price
        : currencyRate.quotes[`${productCurrency}${userCurrency}`] * price;

    const priceWithoutDiscount = `${(priceInUserCurrency * quantity).toFixed(
        2
    )} ${userCurrency}`;

    let priceAfterDiscount;
    if (isDiscountValid) {
        const discountAmount = (priceInUserCurrency * discount) / 100;
        priceAfterDiscount = `${(
            (priceInUserCurrency - discountAmount) *
            quantity
        ).toFixed(2)} ${userCurrency}`;
    }

    return (
        <>
            {discount && isDiscountValid ? (
                <span className="uppercase font-semibold text-md text-lg">
                    <span className="text-md line-through text-text-200 font-light">
                        {priceWithoutDiscount}
                    </span>{" "}
                    {priceAfterDiscount}
                </span>
            ) : (
                <span className="uppercase font-semibold text-md text-lg">
                    {priceWithoutDiscount}
                </span>
            )}
        </>
    );
}

export default PriceLabel;
