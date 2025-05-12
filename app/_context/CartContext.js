"use client";

import { createContext, useContext } from "react";
import { useLocalStorage } from "@/app/_hooks/useLocalStorage";

const CartContext = createContext();

function CartProvider({ children }) {
    const { value: cart, setValue: setCart } = useLocalStorage(
        "cartsy-cart",
        []
    );

    function onRemoveCartItem(id) {
        setCart((prevCart) =>
            prevCart.filter((item) => item?.inventoryId !== id)
        );
    }

    return (
        <CartContext.Provider value={{ cart, setCart, onRemoveCartItem }}>
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
