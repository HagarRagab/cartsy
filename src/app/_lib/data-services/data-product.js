import { supabase } from "@/src/app/_lib/supabase";

/////////////////////////////////////////////////////
// PRODUCT
// GET Product by id
export async function getProductById(productId) {
    const { data: product, error } = await supabase
        .from("Products")
        .select(
            `
                *,
                category:Categories (*),
                brand:Brands (*)
            `
        )
        .eq("id", productId)
        .single();

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot get product.");
    }

    return product;
}

// GET best selling products
export async function getBestSellings(limit = "*") {
    const { data: bestSelling, error } = await supabase
        .from("Products")
        .select(
            `
                *,
                category:Categories (*),
                brand:Brands (*)
            `
        )
        .gt("unitsSold", 10)
        .order("unitsSold", { ascending: false })
        .limit(limit);

    if (error) {
        console.log(error);
        throw new Error(
            "Something went wrong. Cannot get best selling products."
        );
    }

    return bestSelling;
}

// GET products by its category/brand
export async function getProducts(id, getBy) {
    let query = supabase.from("Products").select(
        `
        *,
        category:Categories (*),
        brand:Brands (*)
      `
    );

    if (getBy) query = query.eq(getBy, id);

    const { data: products, error } = await query;

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot get products.");
    }

    return products;
}

// GET products by keywords
export async function getSearchProducts(searchKeyWords, categoryId) {
    let query = supabase
        .from("Products")
        .select(
            `
                *,
                category:Categories (*)
            `
        )
        .contains("tags", searchKeyWords);

    if (Number(categoryId) !== 0) query = query.eq("categoryId", categoryId);

    const { data: products, error } = await query;

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot get products.");
    }

    return products;
}

// GET liked products
export async function getLikedProducts(userId) {
    const { data: products, error } = await supabase
        .from("Users_Wishlist")
        .select(
            `
                *,
                product:Products(
                    *,
                    category:Categories(
                        *
                    ),
                    brand:Brands(
                        *
                    )
                )
            `
        )
        .eq("userId", userId);

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot get products.");
    }

    return products;
}

// GET liked product
export async function checkIfProductIsLiked(userId, productId) {
    const { data: products, error } = await supabase
        .from("Users_Wishlist")
        .select("*")
        .eq("userId", userId)
        .eq("productId", productId);

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot get products.");
    }

    return products;
}

// POST add product to wishlist
export async function addToWishlist(userId, productId) {
    const { error } = await supabase
        .from("Users_Wishlist")
        .insert([{ userId, productId }])
        .select();

    if (error) {
        console.log(error);
        throw new Error(
            "Something went wrong. Cannot add this product to wish list."
        );
    }

    return { error };
}

// DELETE product from wishlist
export async function removeFromWishlist(id) {
    const { error } = await supabase
        .from("Users_Wishlist")
        .delete()
        .eq("id", id);

    if (error) {
        console.log(error);
        throw new Error(
            "Something went wrong. Cannot remove this product from wish list."
        );
    }

    return { error };
}

/////////////////////////////////////////////////////
// PRODUCT SHIPPING
// GET Product_Shipping data by productId
export async function getProductShipping(productId) {
    const { data: productShipping, error } = await supabase
        .from("Product_Shipping")
        .select("*")
        .single()
        .eq("productId", productId);

    if (error) {
        console.log(error);
        throw new Error(
            "Something went wrong. Cannot get product shipping data."
        );
    }

    return productShipping;
}

/////////////////////////////////////////////////////
// RATING
// GET Ratings by productId
export async function getRatings(productId) {
    const { data: ratings, error } = await supabase
        .from("Ratings")
        .select("*")
        .eq("productId", productId);

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot get ratings.");
    }

    return ratings;
}

/////////////////////////////////////////////////////
// VARIANT
// GET Product variants by productId
export async function getProductVariants(productId) {
    const { data: variants, error } = await supabase
        .from("Variants")
        .select("*")
        .eq("productId", productId);

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot get product variants.");
    }

    return variants;
}

// GET variant by variantId
export async function getVariant(variantId) {
    const { data: variant, error } = await supabase
        .from("Variants")
        .select(
            `
                *,
                product:Products (
                    *
                )
            `
        )
        .single()
        .eq("id", variantId);

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot get product variant.");
    }

    return variant;
}

/////////////////////////////////////////////////////
// INVENTORY
// GET Product inventories by variantId
export async function getProductInventories(variantId) {
    const { data: inventories, error } = await supabase
        .from("Inventories")
        .select("*")
        .eq("variantId", variantId);

    if (error) {
        console.log(error);
        throw new Error(
            "Something went wrong. Cannot get product inventories."
        );
    }

    return inventories;
}

// GET Product inventory by inventoryId
export async function getInventory(inventoryId) {
    const { data: inventory, error } = await supabase
        .from("Inventories")
        .select(
            `
                *,
                variant:Variants (
                    *
                )
            `
        )
        .single()
        .eq("id", inventoryId);

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot get product inventory.");
    }

    return inventory;
}
