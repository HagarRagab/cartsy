import Link from "next/link";
import { Store } from "lucide-react";

function Logo() {
    return (
        <Link href="/" className="flex items-center gap-1">
            <Store size={26} />
            <p className="uppercase text-lg tracking-wider font-semibold">
                Cartsy
            </p>
        </Link>
    );
}

export default Logo;
