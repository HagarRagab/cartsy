import { createClient } from "@/utils/supabase/server";
import { supabase } from "@/app/_lib/supabase";

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
    const { data: products, error } = await supabase
        .from("Products")
        .select(
            `
                *,
                category:Categories (*),
                brand:Brands (*)
            `
        )
        .eq(getBy, id);

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
                product:Products (
                    *,
                    category:Categories(*)
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

/////////////////////////////////////////////////////
// VARIANT
// GET Product variants by productId
export async function getProductVariants(productid) {
    const { data: variants, error } = await supabase
        .from("Variants")
        .select("*")
        .eq("productId", productid);

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
// DISCOUNT
// GET Discounts by productId
export async function getDiscounts(limit = "*") {
    const { data: discounts, error } = await supabase
        .from("Discounts")
        .select("*")
        .gte("endDate", new Date().toISOString())
        .limit(limit);

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
// USER
// GET user by userId
export async function getUser(key, value) {
    const { data: user, error } = await supabase
        .from("Users")
        .select("*")
        .eq(key, value);

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot get user.");
    }

    return user;
}

// Check if user is already exist
export async function checkIfUserExist(email, userName) {
    const { data, error } = await supabase
        .from("Users")
        .select("id")
        .or(`email.eq.${email}, userName.eq.${userName}`);

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot check user existance.");
    }

    return data;
}

// Create new user
export async function createNewUser(newUserInfo) {
    const { data, error } = await supabase
        .from("Users")
        .insert([newUserInfo])
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Something went wrong. Cannot create account.");
    }

    return data;
}

export async function removeUser(id) {
    const { error } = await supabase.from("Users").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Something went wrong. Cannot delete account.");
    }
}

export async function getAuthUser() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
}

export async function updateUserData(userId, newData) {
    const { data, error } = await supabase
        .from("Users")
        .update(newData)
        .eq("id", userId)
        .select()
        .single();

    return { data, error };
}

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

/////////////////////////////////////////////////////
// CART
export async function addToCart(cartItemData) {
    const { data, error } = await supabase
        .from("Cart_Items")
        .insert([{ ...cartItemData }])
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
                    *
                )
            `
        )
        .eq("cartId", cartId);

    if (error) {
        console.error(error);
        throw new Error("Something went wrong. Cannot get cart items.");
    }

    return cartItems;
}
