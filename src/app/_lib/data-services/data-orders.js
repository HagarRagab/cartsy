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
