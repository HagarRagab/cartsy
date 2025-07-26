import { getAuthUser, getUser } from "@/src/app//_lib/data-services/data-user";
import { getCart } from "@/src/app/_lib/actions";
import CartContainer from "@/src/app/_components/cart/CartContainer";
import CheckCartItem from "@/src/app/_components/cart/CheckCartItem";
import CartItem from "@/src/app/_components/cart/CartItem";
import { getPromoCode } from "@/src/app/_lib/data-services/data-deals";
import { getUserCart } from "@/src/app/_lib/data-services/data-cart";
import { getInventory } from "../../_lib/data-services/data-product";

async function Page() {
    const authUser = await getAuthUser();
    const user = authUser && (await getUser("id", authUser.id))[0];

    // cart items for both guest cart and user cart
    const cart = await getCart();
    const cartItems = !user
        ? await Promise.all(
              cart.map(async (item) => ({
                  ...item,
                  inventory: await getInventory(item.inventoryId),
              }))
          )
        : cart;
    const userCart = await getUserCart(user?.id);

    // promo code
    const promoCode =
        userCart &&
        userCart?.promoCodeId &&
        (await getPromoCode("id", userCart.promoCodeId));

    return (
        <CartContainer cart={cartItems} promoCode={promoCode}>
            {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 my-6">
                    <CheckCartItem item={item} />
                    <CartItem item={item} user={user} />
                </div>
            ))}
        </CartContainer>
    );
}

export default Page;
