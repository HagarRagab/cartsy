import CartContainer from "@/app/_components/cart/CartContainer";
import { getCookie } from "@/app/_lib/actions";
import CartItem from "@/app/_components/cart/CartItem";

async function GuestCart({ inventories }) {
    const cart = await getCookie("cartsy-cart");

    return (
        <CartContainer cart={cart}>
            <div className="mt-6">
                {cart.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        inventories={inventories}
                    />
                ))}
            </div>
        </CartContainer>
    );
}

export default GuestCart;
