"use client";

import { useEffect, useState } from "react";
import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { useFormatter, useLocale } from "next-intl";

import { Button } from "@/src/components/ui/button";
import ErrorMsg from "@/src/app/_components/shared/ErrorMsg";
import { convertToSubCurrency } from "@/src/app/_utils/helper";
import SpinnerIcon from "@/src/app/_components/shared/SpinnerIcon";

function StripePayment({ chargeAmount, currency, user }) {
    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [fullUrl, setFullUrl] = useState("");

    const locale = useLocale();
    const format = useFormatter();

    function formatCurrency(value) {
        const formattedValue = format.number(value, {
            numberingSystem: "latn",
            style: "currency",
            currency: currency,
        });
        return formattedValue;
    }

    useEffect(() => {
        if (typeof window === undefined) return;

        setFullUrl(window.location.origin);
    }, []);

    useEffect(() => {
        if (!chargeAmount || !currency) return;

        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: convertToSubCurrency(chargeAmount),
                currency,
            }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [chargeAmount, currency]);

    if (!stripe || !elements || !clientSecret)
        return <SpinnerIcon className="mx-auto" />;

    async function handleSubmit(e) {
        e.preventDefault();

        setIsLoading(true);

        if (
            !stripe ||
            !elements ||
            !clientSecret ||
            !user.address ||
            !user.phoneNumber
        ) {
            setIsLoading(false);
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setIsLoading(false);
            return;
        }

        const { error: confirmError } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${fullUrl}/${locale}/payment-success`,
            },
        });

        if (confirmError) {
            setErrorMessage(confirmError.message);
            setIsLoading(false);
        } else {
            // The payment UI automatically closes with a success animation. User is redirected to `return_url`.
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {clientSecret && stripe && elements && <PaymentElement />}

            {errorMessage && (
                <ErrorMsg className="flex-row mt-4">{errorMessage}</ErrorMsg>
            )}

            <Button
                className="primary-btn w-full mt-4"
                disabled={
                    isLoading ||
                    !stripe ||
                    !elements ||
                    !user.address ||
                    !user.phoneNumber
                }
            >
                {isLoading ? (
                    "Processing..."
                ) : (
                    <>
                        <span>Pay</span>
                        <span className="font-semibold text-base">
                            {formatCurrency(chargeAmount)}
                        </span>
                    </>
                )}
            </Button>
        </form>
    );
}

export default StripePayment;
