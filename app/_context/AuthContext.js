"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children, user }) {
    const [language, setLanguage] = useState("English");
    const [currency, setCurrency] = useState("USD");

    return (
        <AuthContext.Provider
            value={{ user, language, setLanguage, currency, setCurrency }}
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
