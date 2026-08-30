"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCart } from "../../_context/CartContext";
import { useEffect } from "react";

function CartIcon({ numCartItems, locale }) {
    const { orderSummary, setOrderSummary } = useCart();

    useEffect(() => {
        setOrderSummary((prevOrderSummary) => ({
            ...prevOrderSummary,
            totalCartItems: numCartItems,
        }));
    }, [numCartItems]);

    return (
        <Link
            href={`/${locale}/cart`}
            className="relative cursor-pointer"
            aria-label={`Shopping cart with ${orderSummary.totalCartItems} items`}
        >
            <ShoppingCart size={24} aria-hidden="true" />
            <span className="absolute bottom-4 left-3 right-0 bg-primary-200 text-text-200 rounded-full w-5 h-5 flex items-center justify-center border border-bg-800 text-sm">
                {orderSummary.totalCartItems}
            </span>
        </Link>
    );
}

export default CartIcon;
