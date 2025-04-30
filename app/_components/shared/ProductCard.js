import { isPast } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import SaleLabel from "@/app/_components/home/SaleLabel";
import RatingStars from "@/app/_components/productDetails/RatingStars";
import PriceLabel from "@/app/_components/shared/PriceLabel";
import { getCategory, getDiscount, getRatings } from "@/app/_lib/data-service";
import { calcTotalRating } from "@/app/_utils/helper";

async function ProductCard({ product }) {
    const { id, title, categoryId, originalPrice, currency, imagePreview } =
        product;

    const category = await getCategory({ categoryId });
    const ratings = await getRatings(id);
    const rating = calcTotalRating(ratings);
    const discount = await getDiscount(id);
    const isDiscountValid = !discount
        ? false
        : !isPast(new Date(discount?.endDate));

    return (
        <Link
            href={`/products/${category.slug}/${id}`}
            className="group transition-all rounded-2xl overflow-hidden max-w-70 shadow-md"
        >
            <div
                title={title.en}
                className="w-full relative border-2 border-bg-200 overflow-hidden"
            >
                {isDiscountValid && <SaleLabel />}
                <div className="relative w-full aspect-square bg-bg-100">
                    <Image
                        fill
                        src={imagePreview}
                        alt={title.en}
                        className="object-contain p-2 bg-bg-100 group-hover:scale-90 transition-all"
                    />
                </div>
                <div className="flex flex-col gap-2 p-4">
                    <h3 className="text-text-500 text-sm">{category.name}</h3>
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis font-bold text-sm">
                        {title.en}
                    </p>
                    <p className="text-accent-200 text-md font-semibold">
                        <PriceLabel
                            price={originalPrice}
                            discount={discount?.percentage}
                            isDiscountValid={isDiscountValid}
                            currency={currency}
                        />
                    </p>
                    {rating && (
                        <div className="flex items-center gap-1">
                            <RatingStars totalRating={rating} />
                            <p className="text-text-500 text-sm">
                                {rating} ({ratings.length} reviews)
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
