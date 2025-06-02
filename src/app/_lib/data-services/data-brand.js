import { supabase } from "@/src/app/_lib/supabase";

/////////////////////////////////////////////////////
// BRAND
// GET Brands
export async function getBrands() {
    const { data: brands, error } = await supabase
        .from("Brands")
        .select("*")
        .eq("isGlobal", true);

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot load brands.");
    }

    return brands;
}

// GET Brand name by brandId
export async function getBrand(value, getBy) {
    const { data: brand } = await supabase
        .from("Brands")
        .select("*")
        .eq(getBy, value)
        .single();

    return brand;
}
