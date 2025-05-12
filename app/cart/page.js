import {
    getAuthUser,
    getCartItems,
    getProductInventories,
    getUser,
    getUserCart,
    getVariant,
} from "@/app//_lib/data-service";

import GuestCart from "@/app/_components/cart/GuestCart";
import UserCart from "@/app/_components/cart/UserCart";

async function Page({ searchParams }) {
    const { variant: variantId } = await searchParams;

    const authUser = await getAuthUser();
    const user = authUser && (await getUser("email", authUser.email))[0];
    const cart = await getUserCart(user?.id);
    const cartItems = !!cart && (await getCartItems(cart.id));

    const variant = variantId && (await getVariant(+variantId));
    // Fetching inventories associated to variant on the searchParams
    const inventories = variant && (await getProductInventories(variant.id));

    return !user ? (
        <GuestCart inventories={inventories} />
    ) : (
        <UserCart cartItems={cartItems} />
    );
}

export default Page;
