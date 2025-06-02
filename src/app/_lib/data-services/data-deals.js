import { supabase } from "@/src/app/_lib/supabase";

/////////////////////////////////////////////////////
// DISCOUNT
// GET Discounts by productId
export async function getDiscounts(limit = "*", values = null) {
    let query = supabase
        .from("Discounts")
        .select(
            `
              *,
              product:Products (
                  *,
                  category:Categories(*),
                  brand:Brands(*)
              )
          `
        )
        .gte("endDate", new Date().toISOString())
        .limit(limit);

    if (values) query = query.in("productId", values);

    const { data: discounts, error } = await query;

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot get discounts.");
    }

    return discounts;
}

// GET Discounts by productId
export async function getDiscount(productId) {
    const { data: discount, error } = await supabase
        .from("Discounts")
        .select("*")
        .single()
        .eq("productId", productId);

    if (!discount) return null;

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot get product discount.");
    }

    return discount;
}

/////////////////////////////////////////////////////
// PROMO CODES
export async function getPromoCode(code) {
    let { data: promoCode, error } = await supabase
        .from("Promo_Codes")
        .select("*")
        .eq("code", code)
        .single();

    if (error) {
        console.error(error);
    }

    return { promoCode, error };
}
