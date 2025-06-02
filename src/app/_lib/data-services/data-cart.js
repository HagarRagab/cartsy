import { supabase } from "@/src/app/_lib/supabase";

/////////////////////////////////////////////////////
// CART
// POST cart for new User
export async function createNewCart(userId) {
    const { data, error } = await supabase
        .from("Users_Carts")
        .insert([{ userId }])
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Something went wrong. Cannot create new cart.");
    }

    return data;
}

// GET userCart
export async function getUserCart(userId) {
    if (!userId) return null;

    let { data: usersCarts, error } = await supabase
        .from("Users_Carts")
        .select("*")
        .eq("userId", userId)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Something went wrong. Cannot get user cart.");
    }

    return usersCarts;
}

export async function addToCart(cartItemData) {
    const { data, error } = await supabase
        .from("Cart_Items")
        .insert([...cartItemData])
        .select();

    if (error) {
        console.error(error);
        throw new Error("Something went wrong. Cannot add to cart.");
    }

    return data;
}

export async function getCartItems(cartId) {
    let { data: cartItems, error } = await supabase
        .from("Cart_Items")
        .select(
            `
              *,
              inventory:Inventories (
                *,
                variant:Variants (
                    *,
                    product:Products(*)
                )
              )
          `
        )
        .eq("cartId", cartId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        throw new Error("Something went wrong. Cannot get cart items.");
    }

    return cartItems;
}

export async function updateCartItem(cartItemId, updatedValues) {
    const { data, error } = await supabase
        .from("Cart_Items")
        .update(updatedValues)
        .eq("id", cartItemId)
        .select()
        .order("created_at", { ascending: true });

    if (error) {
        console.error(error);
        throw new Error("Something went wrong. Cannot update cart item.");
    }

    return data;
}

export async function removeCartItem(cartItemId) {
    const { error } = await supabase
        .from("Cart_Items")
        .delete()
        .eq("id", cartItemId);

    if (error) {
        console.error(error);
        throw new Error("Something went wrong. Cannot remove cart item.");
    }

    return error;
}
