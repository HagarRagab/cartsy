"use client";

import { useFormatter } from "next-intl";
import { useAuth } from "@/src/app/_context/AuthContext";

function FormattedPrice({ value, currency = "" }) {
    console.log(value);
    const format = useFormatter();
    const { settings } = useAuth();

    function formatCurrency(value) {
        const formattedValue = format.number(value, {
            numberingSystem: "latn",
            style: "currency",
            currency: currency || settings.currency,
        });
        return formattedValue;
    }

    return <>{formatCurrency(value)}</>;
}

export default FormattedPrice;
