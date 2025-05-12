"use client";

import { ShoppingCart } from "lucide-react";

import ItemActionBtn from "@/app/_components/shared/ItemActionBtn";
import { addToCartAction, setCookie } from "@/app/_lib/actions";

function AddToCart({ userCart, selectedInventoryId, quantity }) {
    async function handleAddToCart() {
        if (userCart)
            await addToCartAction({
                cartId: userCart.id,
                selectedInventoryId,
                quantity,
            });
        else {
            await setCookie(selectedInventoryId, quantity);
        }
    }

    return (
        <ItemActionBtn
            icon={<ShoppingCart />}
            label="Add to cart"
            style="outline-btn"
            onAddToCart={handleAddToCart}
        />
    );
}

export default AddToCart;
