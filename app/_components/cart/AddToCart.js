"use client";

import { ShoppingCart } from "lucide-react";
import ItemActionBtn from "@/app/_components/shared/ItemActionBtn";
import { addToCartAction } from "@/app/_lib/actions";
import { useSearchParams } from "next/navigation";

function AddToCart({ userCart, defaultInventoryId }) {
    const searchParams = useSearchParams();
    const inventoryId = searchParams.get("inventory") || defaultInventoryId;
    const quantity = searchParams.get("quantity") || 1;

    async function handleAddToCart() {
        await addToCartAction({ cartId: userCart.id, inventoryId, quantity });
    }

    return (
        <ItemActionBtn
            icon={<ShoppingCart />}
            label="Add to cart"
            style="outline-btn"
            onClick={handleAddToCart}
        />
    );
}

export default AddToCart;
