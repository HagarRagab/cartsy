"use client";

import { useAuth } from "@/src/app/_context/AuthContext";
import CheckoutSummary from "@/src/app/_components/checkout/CheckoutSummary";
import PurchaseInfoCard from "@/src/app/_components/checkout/PurchaseInfoCard";
import StripePaymentElements from "@/src/app/_components/checkout/StripePaymentElements";
import { useCart } from "@/src/app/_context/CartContext";

function CheckoutContainer({ selectedCartItems }) {
    const { user, currencyRate } = useAuth();

    const { orderSummary } = useCart();

    const {
        itemsPrice,
        discountAmount,
        itemsPriceAfterDiscount,
        shippingCost,
        chargeAmount,
    } = orderSummary;

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
                itemsPrice={itemsPrice}
                itemsPriceAfterDiscount={itemsPriceAfterDiscount}
                shippingCost={shippingCost}
                discountAmount={discountAmount}
                currencyRate={currencyRate}
            />
        </div>
    );
}

export default CheckoutContainer;
