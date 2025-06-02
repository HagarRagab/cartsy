import { supabase } from "@/src/app/_lib/supabase";

/////////////////////////////////////////////////////
// CATEGORY
// GET Categories
export async function getCategories() {
    const { data: categories, error } = await supabase
        .from("Categories")
        .select("*");

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot load categories.");
    }

    return categories;
}

// GET Category by categoryId
export async function getCategory({ categoryId = "", categorySlug = "" }) {
    const filters = [];
    if (categoryId) filters.push(`id.eq.${categoryId}`);
    if (categorySlug) filters.push(`slug.eq.${categorySlug}`);
    if (!categoryId && !categorySlug)
        throw new Error("You must provide categoryId or categorySlug");

    const { data: category, error } = await supabase
        .from("Categories")
        .select("*")
        .or(filters.join(","))
        .single();

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot get category.");
    }

    return category;
}
