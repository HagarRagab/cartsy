import { getTranslations } from "next-intl/server";

import SummaryItem from "@/src/app/_components/account/orders/SummaryItem";

async function OrderSummary({ order }) {
    const {
        subTotalAmount,
        discountAmount,
        shippingCost,
        chargeAmount,
        currency,
        paymentMethod,
        lastFourCardNumbers,
    } = order;

    const t = await getTranslations("orderDetails");

    return (
        <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <SummaryItem
                label={t("subtotal")}
                value={subTotalAmount}
                currency={currency}
            />
            <SummaryItem
                label={t("discount")}
                value={discountAmount}
                currency={currency}
            />
            <SummaryItem
                label={t("shipping")}
                value={shippingCost}
                currency={currency}
            />
            <SummaryItem
                label={t("total")}
                value={chargeAmount}
                currency={currency}
                className="font-semibold"
            />

            <hr className="col-span-full" />

            <SummaryItem label={t("paymentMethod")} value={paymentMethod} />

            {lastFourCardNumbers && (
                <SummaryItem
                    label={t("cardNumber")}
                    value={lastFourCardNumbers.toString().padStart(16, "*")}
                />
            )}
        </div>
    );
}

export default OrderSummary;
