import { Store } from "lucide-react";
import Link from "next/link";

function Logo() {
    return (
        <Link href="/" className="col-span-1 flex items-center gap-1">
            <Store size={20} className="w-6 h-6 shrink-0" />
            <p className="uppercase md:text-lg tracking-wider font-semibold">
                Cartsy
            </p>
        </Link>
    );
}

export default Logo;
