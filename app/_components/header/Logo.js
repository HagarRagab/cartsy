import { Store } from "lucide-react";
import Link from "next/link";

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
