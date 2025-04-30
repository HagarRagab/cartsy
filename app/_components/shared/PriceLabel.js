function PriceLabel({
    price,
    currency,
    discount,
    isDiscountValid,
    quantity = 1,
}) {
    const priceWithoutDiscount = (price * quantity).toFixed(2) + " " + currency;
    let priceAfterDiscount;
    if (isDiscountValid)
        priceAfterDiscount =
            ((price - (price * discount) / 100) * quantity).toFixed(2) +
            " " +
            currency;

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
