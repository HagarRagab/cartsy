import { createClient } from "@/src/utils/supabase/server";
import { supabase } from "@/src/app/_lib/supabase";

/////////////////////////////////////////////////////
// Create order
export async function createOrder(order) {
    const { data, error } = await supabase
        .from("Users_Orders")
        .insert([order])
        .select();

    if (error) {
        console.error(error);
        throw new Error("Cannot create order");
    }

    return data;
}

// GET orders
export async function getAllOrders(userId) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user.id !== userId) return;

    let { data: Users_Orders, error } = await supabase
        .from("Users_Orders")
        .select("*")
        .eq("userId", userId);

    if (error) {
        console.error(error);
        throw new Error("Cannot get user orders.");
    }

    return Users_Orders;
}
