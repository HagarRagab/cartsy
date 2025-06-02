"use client";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

import {
    calcRatings,
    calcTotalRating,
    handleCounting,
} from "@/src/app/_utils/helper";
import RatingStars from "@/src/app/_components/productDetails/RatingStars";

function Ratings({ ratings }) {
    const ratingsValues = calcRatings(ratings);
    const totalRating = calcTotalRating(ratings);

    const t = useTranslations("productDetails");

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className="font-semibold text-xl">{t("customerReviews")}</h2>
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-baseline gap-1">
                    <p className="font-bold text-2xl">{totalRating}</p>
                    <span>{t("outOf")} 5</span>
                </div>
                <RatingStars totalRating={totalRating} />
                <p className="text-text-300">
                    {ratings.length} {t("globalRatings")}
                </p>
            </div>
            <div>
                {Object.entries(ratingsValues).map((rating) => {
                    const rateBarWidth = `${
                        (rating[1] / ratings.length) * 100
                    }%`;

                    return (
                        <div
                            className="flex items-center gap-2"
                            key={rating[0]}
                        >
                            <Star
                                className="fill-yellow-500 stroke-0"
                                size={15}
                            />
                            <span className="text-text-500">{rating[0]}</span>
                            <div className="relative w-40 h-2 bg-bg-300 rounded-full overflow-hidden shadow-sm">
                                <div
                                    style={{ width: rateBarWidth }}
                                    className={`absolute h-full top-0 left-0 bg-accent-200 rounded-full`}
                                />
                            </div>
                            <p>{handleCounting(rating[1])}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Ratings;
