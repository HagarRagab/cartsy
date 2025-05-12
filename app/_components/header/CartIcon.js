import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { getCookie } from "@/app/_lib/actions";

async function CartIcon() {
    const cart = await getCookie("cartsy-cart");

    return (
        <Link href="/cart" className="relative cursor-pointer">
            <ShoppingCart size={26} />
            <p className="absolute bottom-4 left-4 right-0 bg-primary-200 text-text-200 rounded-full w-5 h-5 flex items-center justify-center border-1 border-bg-800 text-sm">
                {cart.length}
            </p>
        </Link>
    );
}

export default CartIcon;
