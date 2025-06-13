import SummaryItem from "@/src/app/_components/account/orders/SummaryItem";

function OrderSummary({ order }) {
    const {
        subTotalAmount,
        discountAmount,
        shippingCost,
        chargeAmount,
        currency,
        paymentMethod,
        lastFourCardNumbers,
    } = order;

    return (
        <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <SummaryItem
                label="Subtotal"
                value={subTotalAmount}
                currency={currency}
            />
            <SummaryItem
                label="Discount"
                value={discountAmount}
                currency={currency}
            />
            <SummaryItem
                label="Shipping"
                value={shippingCost}
                currency={currency}
            />
            <SummaryItem
                label="Total"
                value={chargeAmount}
                currency={currency}
                className="font-semibold"
            />

            <hr className="col-span-full" />

            <SummaryItem label="Payment method" value={paymentMethod} />

            {lastFourCardNumbers && (
                <SummaryItem
                    label="Card number"
                    value={lastFourCardNumbers.toString().padStart(16, "*")}
                />
            )}
        </div>
    );
}

export default OrderSummary;
