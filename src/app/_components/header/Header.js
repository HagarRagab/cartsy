import { getLocale } from "next-intl/server";

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
import Link from "next/link";
import { Home } from "lucide-react";

async function Header({ user }) {
    const cookieCart = await getCookie("cartsy-cart");
    const userCart = user && (await getUserCart(user?.id));
    const userCartItems = userCart && (await getCartItems(userCart.id));

    const numCartItems = !user ? cookieCart.length : userCartItems.length;
    const locale = await getLocale();

    return (
        <header className="bg-bg-800 text-text-700">
            <div className="mx-auto p-4 md:py-6 md:px-12 gap-y-4 grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-8 items-center">
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
                <div className="bg-bg-700 px-4 py-3 sm:hidden flex items-center justify-between fixed bottom-0 left-0 right-0 z-[100]">
                    <Link href="/">
                        <Home />
                    </Link>
                    <RegionalSettings />
                    <CartIcon numCartItems={numCartItems} locale={locale} />
                    <Account locale={locale} />
                </div>
            </div>
        </header>
    );
}

export default Header;
