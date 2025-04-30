import Link from "next/link";

import { getCategories } from "@/app/_lib/data-service";

async function Navbar() {
    const categories = await getCategories();

    return (
        <nav className="w-[calc(100vw-17px)] overflow-hidden px-12 py-2 bg-primary-300 text-text-700">
            <ul className="flex items-center justify-between gap-2">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="text-md hover:underline transition-all"
                    >
                        <Link href={`/products/${category.slug}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
