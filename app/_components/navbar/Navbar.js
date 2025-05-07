import Link from "next/link";

import { getCategories } from "@/app/_lib/data-service";
import AllCategoriesMenu from "./AllCategoriesMenu";

async function Navbar() {
    const categories = await getCategories();

    return (
        <nav className="max-w-screen py-2 bg-primary-300 text-text-700">
            <ul className="flex items-center justify-between gap-3 mx-12 overflow-hidden text-nowrap">
                <li>
                    <AllCategoriesMenu categories={categories} />
                </li>
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="w-fit text-md hover:underline transition-all"
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
