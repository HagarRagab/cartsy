import { isPast } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import SaleLabel from "@/app/_components/shared/SaleLabel";
import RatingStars from "@/app/_components/productDetails/RatingStars";
import PriceLabel from "@/app/_components/shared/PriceLabel";
import {
    getAuthUser,
    getDiscount,
    getRatings,
    getUser,
} from "@/app/_lib/data-service";
import { calcTotalRating, convertCurrency } from "@/app/_utils/helper";

async function ProductCard({
    product,
    children,
    containerStyle = "",
    linkStyle = "",
    filteredrating,
}) {
    const { id, title, originalPrice, currency, imagePreview, category } =
        product;

    const ratings = await getRatings(id);
    const rating = calcTotalRating(ratings);

    const discount = await getDiscount(id);
    const isDiscountValid = !discount
        ? false
        : !isPast(new Date(discount?.endDate));

    if (filteredrating > rating) return null;

    const authUser = await getAuthUser();

    const user = authUser && (await getUser("email", authUser.email))[0];
    const userCurrency = user?.currency || "EGP";

    const currencyRate =
        currency === userCurrency
            ? null
            : await convertCurrency(currency, userCurrency);

    return (
        <div
            className={`${containerStyle} rounded-2xl overflow-hidden shadow-md border-2 border-bg-200`}
        >
            <Link
                href={`/products/${category.slug}/${id}`}
                className={`${linkStyle} w-full relative group transition-all`}
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
                    <p className="whitespace-nowrap text-ellipsis font-bold text-sm">
                        {title.en}
                    </p>
                    <p className="text-accent-200 text-md font-semibold">
                        <PriceLabel
                            price={originalPrice}
                            discount={discount?.percentage}
                            isDiscountValid={isDiscountValid}
                            productCurrency={currency}
                            userCurrency={userCurrency}
                            currencyRate={currencyRate}
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
            </Link>
            {children}
        </div>
    );
}

export default ProductCard;
