import { Home } from "lucide-react";
import { getLocale } from "next-intl/server";
import Link from "next/link";

import Account from "@/src/app/_components/header/Account";
import CartIcon from "@/src/app/_components/header/CartIcon";
import Location from "@/src/app/_components/header/Location";
import Logo from "@/src/app/_components/header/Logo";
import RegionalSettings from "@/src/app/_components/header/RegionalSettings";
import Search from "@/src/app/_components/header/Search";
import { getCookie } from "@/src/app/_lib/actions";
import {
    getCartItems,
    getUserCart,
} from "@/src/app/_lib/data-services/data-cart";

async function Header({ user }) {
    const cookieCart = await getCookie("cartsy-cart");
    const userCart = user && (await getUserCart(user?.id));
    const userCartItems = userCart && (await getCartItems(userCart.id));

    const numCartItems = !user ? cookieCart.length : userCartItems.length;
    const locale = await getLocale();

    return (
        <header className="bg-bg-800 text-text-700">
            <div className="mx-auto p-4 md:py-6 md:px-12 gap-4 grid grid-cols-5 lg:grid-cols-8 items-center">
                <Logo />
                {user && user?.city && <Location user={user} />}
                <Search />
                <div className="hidden sm:flex col-span-3 col-start-3 lg:col-start-6 row-start-1 gap-4 items-center justify-end">
                    <RegionalSettings />
                    <span className="bg-text-400 w-[1px] h-8" />
                    <CartIcon numCartItems={numCartItems} locale={locale} />
                    <span className="block bg-text-400 w-[1px] h-8" />
                    <Account locale={locale} />
                </div>
            </div>
        </header>
    );
}

export default Header;
