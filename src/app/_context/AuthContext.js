"use client";

import { createContext, useContext, useState } from "react";

import { DEFAULT_CURRENCY, DEFAULT_LANGUAGE } from "@/src/app/_utils/constants";

const AuthContext = createContext();

function AuthProvider({ children, user, settingsCookie }) {
    const [settings, setSettings] = useState({
        currency:
            user?.currency || settingsCookie?.currency || DEFAULT_CURRENCY,
        language:
            user?.language || settingsCookie?.language || DEFAULT_LANGUAGE,
    });

    return (
        <AuthContext.Provider value={{ user, settings, setSettings }}>
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
