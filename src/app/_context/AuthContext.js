"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { DEFAULT_CURRENCY, DEFAULT_LANGUAGE } from "@/src/app/_utils/constants";
import { convertCurrency } from "@/src/app/_utils/helper";

const AuthContext = createContext();

function AuthProvider({ children, user, settingsCookie }) {
    const [settings, setSettings] = useState({
        currency:
            user?.currency || settingsCookie?.currency || DEFAULT_CURRENCY,
        language:
            user?.language || settingsCookie?.language || DEFAULT_LANGUAGE,
    });
    const [currencyRate, setCurrencyRate] = useState(null);
    const [loadingCurrencyRate, setLoadingCurrencyRate] = useState(false);

    useEffect(() => {
        async function getCurrencyRate() {
            if (settings.currency === DEFAULT_CURRENCY)
                return setCurrencyRate(1);
            setLoadingCurrencyRate(true);
            const rate = await convertCurrency(
                DEFAULT_CURRENCY,
                settings.currency
            );
            setCurrencyRate(
                rate.quotes?.[`${DEFAULT_CURRENCY}${settings.currency}`]
            );
            setLoadingCurrencyRate(false);
        }

        getCurrencyRate();
    }, [settings.currency]);

    return (
        <AuthContext.Provider
            value={{
                user,
                settings,
                setSettings,
                currencyRate,
                loadingCurrencyRate,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("AuthContext was used outside AuthProvider");

    return context;
}

export default AuthProvider;
