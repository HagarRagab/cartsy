import CartIcon from "@/app/_components/header/CartIcon";
import Location from "@/app/_components/header/Location";
import Logo from "@/app/_components/header/Logo";
import RegionalSettings from "@/app/_components/header/RegionalSettings";
import Search from "@/app/_components/header/Search";
import Account from "./Account";

function Header() {
    return (
        <header className="bg-bg-800 text-text-700">
            <div className="mx-auto py-6 px-12 gap-12 flex items-center">
                <Logo />
                <Location />
                <Search />
                <div className="flex gap-4 items-center ml-auto">
                    <RegionalSettings />
                    <span className="block bg-text-400 w-[1px] h-8" />
                    <CartIcon />
                    <span className="block bg-text-400 w-[1px] h-8" />
                    <Account />
                </div>
            </div>
        </header>
    );
}

export default Header;
