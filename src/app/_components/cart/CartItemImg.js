"use client";

import Image from "next/image";
import Link from "next/link";

function CartItemImg({ product, image, locale }) {
    const productLink = `/${locale}/products/${product.category.slug}/${product.id}`;

    return (
        <Link
            href={productLink}
            className="group relative w-full aspect-square bg-bg-100 border border-bg-200 rounded-md overflow-hidden shadow-sm"
        >
            <Image
                fill
                src={image}
                alt={product.title[locale]}
                className="object-contain p-2 bg-bg-100 group-hover:scale-90 transition-all"
            />
        </Link>
    );
}

export default CartItemImg;
