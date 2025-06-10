import { getAuthUser, getUser } from "@/src/app//_lib/data-services/data-user";
import {
    getProductInventories,
    getVariant,
} from "@/src/app//_lib/data-services/data-product";
import { getCart } from "@/src/app/_lib/actions";
import CartContainer from "@/src/app/_components/cart/CartContainer";
import CheckCartItem from "@/src/app/_components/cart/CheckCartItem";
import CartItem from "@/src/app/_components/cart/CartItem";
import { getPromoCode } from "@/src/app/_lib/data-services/data-deals";
import { getUserCart } from "@/src/app/_lib/data-services/data-cart";

async function Page({ searchParams }) {
    const { variant: variantId } = await searchParams;

    const authUser = await getAuthUser();
    const user = authUser && (await getUser("id", authUser.id))[0];

    const variant = variantId && (await getVariant(+variantId));
    // Fetching inventories associated to variant on the searchParams
    const inventories = variantId && (await getProductInventories(variant.id));

    // cart items for both guest cart and user cart
    const cartItems = await getCart();
    const userCart = await getUserCart(user.id);

    // promo code
    const promoCode =
        userCart.promoCodeId &&
        (await getPromoCode("id", userCart.promoCodeId));

    return (
        <CartContainer cart={cartItems} promoCode={promoCode}>
            {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 my-6">
                    <CheckCartItem item={item} />
                    <CartItem
                        item={item}
                        inventories={inventories}
                        user={user}
                    />
                </div>
            ))}
        </CartContainer>
    );
}

export default Page;
