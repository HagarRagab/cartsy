"use server";

import { revalidatePath } from "next/cache";
import {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    updateUserData,
} from "@/app/_lib/data-service";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function updateProfileAction(newData, path) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { error } = await updateUserData(user.id, newData);
    if (error) {
        return {
            success: false,
            message:
                "Something went wrong while updating your profile information. Please try again later.",
        };
    } else {
        revalidatePath(path);
        return {
            success: true,
            message: "Successfully updated your profile.",
        };
    }
}

export async function addToWishlistAction(userId, productId, path) {
    const { error } = await addToWishlist(userId, productId);

    if (error) redirect("/error");
    else {
        revalidatePath(path);
    }
}

export async function removeFromWishlistAction(id, path) {
    const { error } = await removeFromWishlist(id);

    if (error) redirect("/error");
    else revalidatePath(path);
}

export async function addToCartAction(cartItemData) {
    const cartItem = await addToCart(cartItemData);

    if (!cartItem) redirect("/error");
    else revalidatePath("/cart");
}

export async function setCookie(selectedInventoryId, quantity = 1) {
    const cookieStore = await cookies();
    const cartCookie = cookieStore.get("cartsy-cart")?.value;
    const cart = cartCookie ? JSON.parse(cartCookie) : [];

    const sameItem = cart?.find(
        (item) => item?.inventoryId === selectedInventoryId
    );

    if (!sameItem)
        cookieStore.set(
            "cartsy-cart",
            JSON.stringify([
                ...cart,
                {
                    id: crypto.randomUUID(),
                    inventoryId: selectedInventoryId,
                    quantity,
                },
            ])
        );
    else
        cookieStore.set(
            "cartsy-cart",
            JSON.stringify(
                cart.map((item) =>
                    item.inventoryId === selectedInventoryId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            )
        );
}

export async function getCookie(key) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(key)?.value;
    return cookie ? JSON.parse(cookie) : [];
}

export async function updateCookie(
    selectedInventoryId,
    cookieItemId,
    quantity = 1
) {
    const cookieStore = await cookies();
    const cartCookie = cookieStore.get("cartsy-cart")?.value;
    const cart = JSON.parse(cartCookie);

    const sameItem = cart?.find(
        (item) => item?.inventoryId === selectedInventoryId
    );

    if (!sameItem) {
        cookieStore.set(
            "cartsy-cart",
            JSON.stringify(
                cart.map((item) =>
                    item.id === cookieItemId
                        ? { ...item, inventoryId: selectedInventoryId }
                        : item
                )
            )
        );
    } else
        cookieStore.set(
            "cartsy-cart",
            JSON.stringify(
                cart.map((item) =>
                    item.inventoryId === selectedInventoryId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            )
        );
}

export async function updateCookieItemQuantity(quantity, cookieItemId) {
    const cookieStore = await cookies();
    const cartCookie = cookieStore.get("cartsy-cart")?.value;
    const cart = JSON.parse(cartCookie);

    const updatedCart = cart.map((item) =>
        item.id === cookieItemId ? { ...item, quantity } : item
    );
    cookieStore.set("cartsy-cart", JSON.stringify(updatedCart));
}

export async function removeCookieItem(cookieItemId) {
    const cookieStore = await cookies();
    const cartCookie = cookieStore.get("cartsy-cart")?.value;
    const cart = JSON.parse(cartCookie);

    const filteredCart = cart.filter((c) => c.id !== cookieItemId);
    cookieStore.set("cartsy-cart", JSON.stringify(filteredCart));
}
