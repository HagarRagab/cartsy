"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children, user }) {
    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("AuthContext was used outside AuthProvider");

    return context;
}

export default AuthProvider;
