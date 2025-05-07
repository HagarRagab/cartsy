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
    else revalidatePath(path);
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
