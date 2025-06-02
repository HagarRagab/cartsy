"use client";

import { useLocale } from "next-intl";
import Link from "next/link";

function ProductTitle({ product }) {
    const locale = useLocale();
    const productLink = `/${locale}/products/${product.category.slug}/${product.id}`;

    return (
        <Link
            href={productLink}
            className="w-30 sm:w-full max-w-96 overflow-hidden whitespace-nowrap text-ellipsis font-bold"
        >
            {product.title[locale]}
        </Link>
    );
}

export default ProductTitle;
