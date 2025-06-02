import { Star } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { calcTotalRating, handleCounting } from "@/src/app/_utils/helper";

async function ProductHeading({ title, unitsSold, ratings }) {
    let totalRating = 0;
    if (ratings.length) totalRating = calcTotalRating(ratings);

    const t = await getTranslations("productDetails");

    return (
        <div>
            <h1 className="font-bold text-xl mb-2">{title}</h1>
            <div className="flex items-center text-text-400 gap-1">
                {totalRating !== 0 && (
                    <>
                        <Star className="fill-yellow-500 text-xs stroke-0" />
                        <p>
                            {totalRating} {t("ratings")}
                        </p>
                        <span className="px-1">-</span>
                        <p>
                            {handleCounting(ratings.length)} {t("reviews")}
                        </p>
                        <span className="px-1">-</span>
                    </>
                )}
                <p>
                    {handleCounting(unitsSold)} {t("sold")}
                </p>
            </div>
        </div>
    );
}

export default ProductHeading;
