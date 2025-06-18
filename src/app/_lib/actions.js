"use server";

import { revalidatePath } from "next/cache";
import {
    getPromoCode,
    setPromoCode,
} from "@/src/app/_lib/data-services/data-deals";
import {
    addToWishlist,
    removeFromWishlist,
    updateStock,
} from "@/src/app/_lib/data-services/data-product";
import {
    addToCart,
    getCartItems,
    getUserCart,
    removeCartItem,
    resetCart,
    updateCartItem,
} from "@/src/app/_lib/data-services/data-cart";
import {
    addReview,
    updateReview,
    updateUserData,
} from "@/src/app/_lib/data-services/data-user";
import { getInventory } from "@/src/app/_lib/data-services/data-product";
import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { isPast } from "date-fns";
import { COOKIES_EXPIRATION } from "@/src/app/_utils/constants";
import { stripe } from "@/src/app/_lib/stripe";
import {
    createOrder,
    getAllOrders,
} from "@/src/app/_lib/data-services/data-orders";

export async function updateProfileAction(newData, path) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { error } = await updateUserData(user.id, newData);
    if (error) {
        return {
            success: false,
            message: {
                en: "Something went wrong while updating your profile information. Please try again later.",
                ar: "حدث خطأ أثناء تحديث معلومات ملفك الشخصي. يُرجى المحاولة لاحقًا.",
            },
        };
    } else {
        revalidatePath(path);
        return {
            success: true,
            message: {
                en: "Successfully updated your profile.",
                ar: "تم تحديث ملفك الشخصي بنجاح.",
            },
        };
    }
}

export async function addToWishlistAction(userId, productId) {
    if (!userId || !productId) throw new Error("No userId or productId");

    const { error } = await addToWishlist(userId, productId);

    if (error) redirect("/error");
    else {
        revalidatePath("/");
        revalidatePath("/cart");
    }
}

export async function removeFromWishlistAction(id) {
    if (!id) return;

    const { error } = await removeFromWishlist(id);

    if (error) redirect("/error");
    else {
        revalidatePath("/");
        revalidatePath("/cart");
    }
}

export async function getCart() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const userCart = user && (await getUserCart(user.id));

    return user
        ? await getCartItems(userCart.id) // for user
        : await getCookie("cartsy-cart"); // for guest
}

export async function addToCartAction(quantity, inventoryId) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const userCart = user && (await getUserCart(user.id));
    const cartItems = await getCart();

    const similarItem = cartItems?.find(
        (item) => item?.inventoryId === inventoryId
    );

    const inventory = await getInventory(inventoryId);

    if (!similarItem) {
        // Create new cart item
        const result = user
            ? await addToCart([
                  {
                      quantity,
                      inventoryId,
                      cartId: userCart.id,
                      isSelected: true,
                  },
              ])
            : await setCookie("cartsy-cart", [
                  ...cartItems,
                  {
                      id: crypto.randomUUID(),
                      inventoryId,
                      inventory,
                      quantity,
                      isSelected: true,
                  },
              ]);

        if (!result)
            return {
                status: "failed",
                message: {
                    en: "Failed to add this product to your cart.",
                    ar: "فشل في إضافة هذا المنتج إلى سلة التسوق الخاصة بك.",
                },
            };
        else {
            revalidatePath("/cart");
            return {
                status: "success",
                message: {
                    en: "Successfully added to your cart.",
                    ar: "تمت الإضافة إلى سلة التسوق الخاصة بك بنجاح.",
                },
            };
        }
    } else {
        return await updateCartItemQuantity(
            similarItem.id,
            inventoryId,
            Number(similarItem.quantity) + Number(quantity)
        );
    }
}

export async function updateCartItemAction(locale, cartItemId, newValues) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    const cartItems = await getCart();
    const cartItem = cartItems.find((item) => item.id === cartItemId);

    // Check if there is a similar item already exist in the cart
    const similarItem = cartItems?.find(
        (item) => item?.inventoryId === newValues.inventoryId
    );

    const inventory = await getInventory(newValues.inventoryId);
    const newQuantity =
        inventory.stock < cartItem.quantity
            ? inventory.stock
            : cartItem.quantity;

    if (!similarItem) {
        const result = user
            ? await updateCartItem(cartItemId, {
                  ...newValues,
                  quantity: newQuantity,
              })
            : setCookie(
                  "cartsy-cart",
                  cartItems.map((item) =>
                      item.id === cartItemId
                          ? {
                                ...item,
                                inventoryId: newValues.inventoryId,
                                inventory,
                                quantity: newQuantity,
                            }
                          : item
                  )
              );

        if (!result)
            return {
                status: "failed",
                message: {
                    en: "Cannot update this item. Please try again later.",
                    ar: "لا يمكن تحديث هذا العنصر. يُرجى المحاولة لاحقًا.",
                },
            };

        revalidatePath(`/${locale}/cart`);
        return {
            status: "failed",
            message: {
                en: "Successfuly updated the cart item.",
                ar: "تم تحديث عنصر عربة التسوق بنجاح.",
            },
        };
    } else {
        await updateCartItemQuantity(
            similarItem.id,
            newValues.inventoryId,
            Number(similarItem.quantity) + Number(cartItem.quantity)
        );
        await removeCartItemAction(cartItemId);
        revalidatePath(`/${locale}/cart`);
    }
}

export async function createOrderAction(selectedCartItems, order) {
    const supabase = await createClient();

    // Add order in user orders database table
    const orderResult = await createOrder(order);

    if (!orderResult)
        return {
            status: "failed",
            message: {
                en: "Failed to create order",
                ar: "حدث خطأ أثناء انشاء الطلب الخاص بك",
            },
        };

    // Update stock for all items
    await Promise.all(
        selectedCartItems.map((item) =>
            updateStock(item.inventoryId, item.inventory.stock - item.quantity)
        )
    );

    // Reset cart
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const userCart = await getUserCart(user.id);
    await resetCart(userCart.id);

    // Update user cart -> remove promoCode from users_carts table
    await setPromoCode(user.id, null);

    return {
        status: "success",
        message: {
            en: "Successfully created your order.",
            ar: "تم اشاء الطلب الخاص بك بنجاح",
        },
    };
}

export async function selectionItemAction(cartItemId, newValues) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    const cartItems = await getCart();

    const result = user
        ? await updateCartItem(cartItemId, newValues)
        : await setCookie(
              "cartsy-cart",
              cartItems.map((item) =>
                  item.id === cartItemId
                      ? {
                            ...item,
                            isSelected: newValues.isSelected,
                        }
                      : item
              )
          );

    if (!result)
        return {
            status: "failed",
            message: {
                en: "Failed updating cart item",
                ar: "فشل تحديث عنصر عربة التسوق",
            },
        };

    revalidatePath("/cart");
}

export async function updateCartItemQuantity(
    cartItemId,
    inventoryId,
    quantity
) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const cartItems = await getCart();
    const inventory = await getInventory(inventoryId);

    const newQuantity =
        inventory.stock < quantity
            ? inventory.stock // maximum number of pieces
            : quantity;

    const result = user
        ? await updateCartItem(cartItemId, {
              quantity: newQuantity,
          })
        : await setCookie(
              "cartsy-cart",
              cartItems.map((item) =>
                  item.id === cartItemId
                      ? {
                            ...item,
                            quantity: newQuantity,
                        }
                      : item
              )
          );

    if (!result)
        return {
            status: "failed",
            message: {
                en: "failed to update cart item quantity",
                ar: "فشل في تحديث كمية عناصر سلة التسوق",
            },
        };

    revalidatePath("/cart");
    return {
        status: "success",
        message: {
            en:
                inventory.stock < quantity
                    ? `This product has maximum limit of purchasing. Maximum quantity is ${inventory.stock}`
                    : `Successfully update cart item quantity`,
            ar:
                inventory.stock < quantity
                    ? `هذا المنتج له حد أقصى للشراء. الكمية القصوى هي ${inventory.stock}`
                    : `تم تحديث كمية عناصر عربة التسوق بنجاح`,
        },
    };
}

export async function removeCartItemAction(cartItemId) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    const cartItems = await getCart();

    if (!user) {
        const filteredCart = cartItems.filter((c) => c.id !== cartItemId);
        setCookie("cartsy-cart", filteredCart);
    } else {
        const error = await removeCartItem(cartItemId);
        if (error)
            return {
                status: "failed",
                message: {
                    en: "Cannot remove cart item. Please try again later.",
                    ar: "لا يمكن إزالة عنصر من سلة التسوق. يُرجى المحاولة لاحقًا.",
                },
            };
    }

    revalidatePath("/cart");
    return {
        status: "success",
        message: {
            en: "Successfuly removed item from your cart.",
            ar: "تم إزالة العنصر من سلة التسوق الخاصة بك بنجاح.",
        },
    };
}

export async function getCookie(key) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(key)?.value;
    return cookie ? JSON.parse(cookie) : [];
}

export async function removeCookie(key) {
    const cookieStore = await cookies();
    cookieStore.delete(key);
}

export async function setCookie(key, value) {
    const cookieStore = await cookies();
    cookieStore.set(key, JSON.stringify(value), {
        expires: new Date(
            Date.now() * 1000 * 60 * 60 * 24 * COOKIES_EXPIRATION
        ),
    });

    return JSON.parse(cookieStore.get(key)?.value);
}

export async function setPromoCodeAction(code) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const promoCode = await getPromoCode("code", code);

    // Check if user was already used the same code before
    const orders = await getAllOrders(user.id);
    const usedCode = orders.some((order) => order.promoCodeId === promoCode.id);

    if (!promoCode)
        return {
            status: "failed",
            message: {
                en: "Invalid promo code. Please try different one",
                ar: "رمز ترويجي غير صالح. يُرجى تجربة رمز آخر.",
            },
        };

    if (usedCode)
        return {
            status: "failed",
            message: {
                en: "Used promo code. Please try different one",
                ar: "رمز ترويجي تم استخدامه. يُرجى تجربة رمز آخر.",
            },
        };

    if (isPast(new Date(promoCode.expires_at)))
        return {
            status: "failed",
            message: {
                en: "Expired promo code. Please try different one",
                ar: "انتهى صلاحية رمز العرض الترويجي. يُرجى تجربة رمز آخر.",
            },
        };

    if (promoCode.current_uses >= promoCode.max_uses)
        return {
            status: "failed",
            message: {
                en: "Exceeding uses times. Please try different one",
                ar: "تجاوزت عدد مرات الاستخدام المحددة. يُرجى تجربة خيار آخر.",
            },
        };
    else {
        const { error } = await setPromoCode(user.id, promoCode.id);

        if (error)
            return {
                status: "failed",
                message: {
                    en: "Cannot apply this promo code. Please try again later or try another one.",
                    ar: "لا يمكن استخدام هذا الرمز الترويجي. يُرجى المحاولة لاحقًا أو استخدام رمز آخر.",
                },
            };

        revalidatePath("/cart");
        return {
            status: "succeed",
            message: promoCode,
        };
    }
}

export async function deletePromoCodeAction() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { error } = await setPromoCode(user.id, null);

    if (error)
        return {
            status: "failed",
            message: {
                en: "Cannot remove promo code",
                ar: "لا يمكن إزالة الرمز الترويجي",
            },
        };

    revalidatePath("/cart");
}

export async function checkoutAction(formData) {
    const items = JSON.parse(formData.get("items"));
    const line_items = items.map((item) => ({
        price_data: {
            currency: item.inventory.currency,
            product_data: {
                name: item.inventory.variant.product.title.en,
            },
            unit_amount: item.inventory.price,
        },
        quantity: item.quantity,
    }));

    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${origin}/success`,
        cancel_url: `${origin}/checkout`,
    });

    redirect(session.url);
}

export async function addReviewAction(userId, reviewInfo, pathname) {
    const review = await addReview(userId, reviewInfo);

    if (!review)
        return {
            status: "failed",
            message: {
                en: "Something went wrong cannot add your review. Please try again later.",
                ar: "حدث خطأ، لا يمكنك إضافة تقييمك. يُرجى المحاولة لاحقًا.",
            },
        };

    revalidatePath(pathname);

    return {
        status: "success",
        message: {
            en: "Successfully your review was added.",
            ar: "لقد تمت إضافة تقييمك بنجاح",
        },
    };
}

export async function editReviewAction(
    userId,
    productId,
    reviewInfo,
    pathname
) {
    const review = await updateReview(productId, userId, reviewInfo);

    if (!review)
        return {
            status: "failed",
            message: {
                en: "Something went wrong cannot edit your review. Please try again later.",
                ar: "حدث خطأ، لا يمكنك تعديل تقييمك. يُرجى المحاولة لاحقًا.",
            },
        };

    revalidatePath(pathname);

    return {
        status: "success",
        message: {
            en: "Successfully updated your review.",
            ar: "لقد تمت تعديل تقييمك بنجاح",
        },
    };
}
