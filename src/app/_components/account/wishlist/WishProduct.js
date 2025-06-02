"use client";

import Image from "next/image";
import PriceLabel from "@/src/app/_components/shared/PriceLabel";
import ProductTitle from "@/src/app/_components/shared/ProductTitle";

function WishProduct({ product }) {
    const { imagePreview, title, originalPrice, currency } = product;
    const { settings } = useAuth();

    return (
        <div className="relative w-full grid grid-cols-[auto_1fr]">
            <div className="w-40 aspect-square">
                <Image
                    src={imagePreview}
                    alt={title[settings.language.slice(0, 2).toLowerCase()]}
                    fill
                    className="object-contain"
                />
            </div>
            <div>
                <ProductTitle product={product} />
                <p>{originalPrice}</p>
                <PriceLabel price={originalPrice} productCurrency={currency} />
            </div>
        </div>
    );
}

export default WishProduct;
