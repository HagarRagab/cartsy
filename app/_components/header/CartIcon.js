import { ShoppingCart } from "lucide-react";
import Link from "next/link";

function CartIcon() {
    const cartItemsNumber = 5;

    return (
        <Link href="/cart" className="relative cursor-pointer">
            <ShoppingCart size={26} />
            <p className="absolute bottom-4 left-4 right-0 bg-primary-200 text-text-200 rounded-full w-5 h-5 flex items-center justify-center border-1 border-bg-800 text-sm">
                {cartItemsNumber}
            </p>
        </Link>
    );
}

export default CartIcon;
