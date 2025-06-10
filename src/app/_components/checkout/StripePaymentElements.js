"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useAuth } from "@/src/app/_context/AuthContext";
import { convertToSubCurrency } from "@/src/app/_utils/helper";
import StripePayment from "@/src/app/_components/checkout/StripePayment";
import SpinnerIcon from "@/src/app/_components/shared/SpinnerIcon";
import { redirect } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function StripePaymentElements({ chargeAmount, selectedCartItems }) {
    const { settings, user } = useAuth();
    const currency = settings.currency.toLowerCase();

    if (chargeAmount === 0) redirect("/");
    if (isNaN(chargeAmount)) return <SpinnerIcon className="mx-auto" />;

    return (
        <Elements
            stripe={stripePromise}
            options={{
                mode: "payment",
                amount: convertToSubCurrency(chargeAmount),
                currency,
            }}
        >
            <StripePayment
                currency={currency}
                chargeAmount={chargeAmount}
                selectedCartItems={selectedCartItems}
                user={user}
            />
        </Elements>
    );
}

export default StripePaymentElements;
