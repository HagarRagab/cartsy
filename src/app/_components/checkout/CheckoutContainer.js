"use client";

import { useAuth } from "@/src/app/_context/AuthContext";
import CheckoutSummary from "@/src/app/_components/checkout/CheckoutSummary";
import PurchaseInfoCard from "@/src/app/_components/checkout/PurchaseInfoCard";
import StripePaymentElements from "@/src/app/_components/checkout/StripePaymentElements";

function CheckoutContainer({ selectedCartItems, promoCode }) {
    const { user, currencyRate } = useAuth();

    const itemsTotalPrice =
        selectedCartItems?.reduce(
            (total, cur) =>
                total + Number(cur.inventory?.price) * Number(cur.quantity),
            0
        ) * currencyRate;

    const promoCodeValue = !promoCode
        ? 0
        : promoCode?.discount_type === "percentage"
        ? (itemsTotalPrice * promoCode?.value) / 100
        : promoCode?.value * currencyRate;

    const totalCartValue = itemsTotalPrice - promoCodeValue;
    const shippingCost = 0 * currencyRate;

    const chargeAmount = totalCartValue + shippingCost;

    return (
        <div className="grid grid-cols-1 md:grid-cols-[4fr_2fr] gap-4">
            <div className="bg-bg-100 p-2 sm:p-8 rounded-md col-span-full lg:col-span-1 row-span-full">
                <PurchaseInfoCard user={user} />

                <StripePaymentElements
                    chargeAmount={chargeAmount}
                    selectedCartItems={selectedCartItems}
                />
            </div>

            <CheckoutSummary
                selectedCartItems={selectedCartItems}
                itemsTotalPrice={itemsTotalPrice}
                totalCartValue={totalCartValue}
                shippingCost={shippingCost}
                promoCodeValue={promoCodeValue}
            />
        </div>
    );
}

export default CheckoutContainer;
