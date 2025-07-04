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
        .eq("userId", userId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        throw new Error("Cannot get user orders.");
    }

    return Users_Orders;
}

// GET order
export async function getOrder(orderId) {
    let { data: order, error } = await supabase
        .from("Users_Orders")
        .select("*")
        .eq("id", orderId)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Cannot get order.");
    }

    return order;
}
