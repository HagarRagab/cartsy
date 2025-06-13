"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [orderSummary, setOrderSummary] = useState({
        itemsPrice: 0,
        discountAmount: 0,
        itemsPriceAfterDiscount: 0,
        shippingCost: 0,
        chargeAmount: 0,
    });

    return (
        <CartContext.Provider
            value={{
                orderSummary,
                setOrderSummary,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) throw new Error("CartContext was used outside CartProvider");

    return context;
}

export default CartProvider;
