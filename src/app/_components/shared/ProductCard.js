import { isPast } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { PackagePlus } from "lucide-react";

import AddToCart from "@/src/app/_components/cart/AddToCart";
import RatingStars from "@/src/app/_components/productDetails/RatingStars";
import PriceLabel from "@/src/app/_components/shared/PriceLabel";
import ProductTitle from "@/src/app/_components/shared/ProductTitle";
import SaleLabel from "@/src/app/_components/shared/SaleLabel";
import { getUserCart } from "@/src/app/_lib/data-services/data-cart";
import { getDiscount } from "@/src/app/_lib/data-services/data-deals";
import {
    getVariantInventories,
    getProductVariants,
} from "@/src/app/_lib/data-services/data-product";
import { getAuthUser } from "@/src/app/_lib/data-services/data-user";
import { getLocale } from "next-intl/server";

async function ProductCard({
    product,
    children,
    containerStyle = "",
    innerContainerStyle = "",
}) {
    const { id, title, originalPrice, imagePreview, category, rating } =
        product;

    const variants = await getProductVariants(id);
    const inventories = await getVariantInventories(variants[0].id);
    const defaultInventoryId = inventories[0]?.id;

    const discount = await getDiscount(id);
    const isDiscountValid = !discount
        ? false
        : !isPast(new Date(discount?.endDate));

    const authUser = await getAuthUser();
    const userCart = await getUserCart(authUser?.id);

    const locale = await getLocale();

    return (
        <div
            className={`${containerStyle} rounded-2xl overflow-hidden shadow-md border-2 border-bg-200`}
        >
            <div className={`${innerContainerStyle} w-full relative`}>
                {isDiscountValid && <SaleLabel />}
                <div className="relative">
                    <Link
                        href={`/${locale}/products/${category.slug}/${id}`}
                        className="block relative w-full aspect-square bg-bg-100 row-span-full md:row-span-1"
                    >
                        <Image
                            src={imagePreview}
                            alt={title[locale] || "product's preview image"}
                            fill
                            className="object-contain p-2 bg-bg-100 hover:scale-90 transition-all"
                        />
                    </Link>
                    <AddToCart
                        userCart={userCart}
                        inventoryId={defaultInventoryId}
                        className="w-10 h-10 absolute bottom-2 right-2 bg-bg-200 rounded-full text-text-100 hover:bg-bg-300 cursor-pointer"
                    >
                        <PackagePlus size={20} />
                    </AddToCart>
                </div>
                <div className="flex flex-col gap-2 p-2 sm:p-4">
                    <ProductTitle product={product} locale={locale} />
                    <Link
                        href={`/${locale}/products/${category.slug}/${id}`}
                        className="text-text-500 text-sm"
                    >
                        {category.name[locale]}
                    </Link>
                    <div className="text-accent-200 text-base font-semibold">
                        <PriceLabel
                            price={originalPrice}
                            discount={discount?.percentage}
                            isDiscountValid={isDiscountValid}
                        />
                    </div>
                    {rating && (
                        <div className="flex items-center gap-1">
                            <RatingStars totalRating={rating} />
                            <p className="text-text-500 text-sm">({rating})</p>
                        </div>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}

export default ProductCard;
