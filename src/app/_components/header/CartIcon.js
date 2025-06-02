import Link from "next/link";
import { ShoppingCart } from "lucide-react";

function CartIcon({ numCartItems, locale }) {
    return (
        <Link href={`/${locale}/cart`} className="relative cursor-pointer">
            <ShoppingCart size={24} />
            <p className="absolute bottom-4 left-3 right-0 bg-primary-200 text-text-200 rounded-full w-5 h-5 flex items-center justify-center border-1 border-bg-800 text-sm">
                {numCartItems}
            </p>
        </Link>
    );
}

export default CartIcon;
