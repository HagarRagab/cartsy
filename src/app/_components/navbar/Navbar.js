import Link from "next/link";
import { getLocale } from "next-intl/server";

import { getCategories } from "@/src/app/_lib/data-services/data-category";
import AllCategoriesMenu from "@/src/app/_components/navbar/AllCategoriesMenu";

async function Navbar() {
    const categories = await getCategories();
    const locale = await getLocale();

    return (
        <nav className="max-w-screen py-2 bg-primary-300 text-text-700 text-sm">
            <ul className="flex items-center justify-between gap-3 mx-4 md:mx-12 overflow-hidden text-nowrap">
                <li>
                    <AllCategoriesMenu
                        categories={categories}
                        locale={locale}
                    />
                </li>
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="w-fit text-base hover:underline transition-all"
                    >
                        <Link href={`/${locale}/products/${category.slug}`}>
                            {category.name[locale]}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
