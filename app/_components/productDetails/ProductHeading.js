import { Star } from "lucide-react";
import { calcTotalRating, handleCounting } from "@/app/_utils/helper";

function ProductHeading({ title, unitsSold, ratings }) {
    let totalRating = 0;
    if (ratings.length) totalRating = calcTotalRating(ratings);

    return (
        <div>
            <h1 className="font-bold text-xl mb-2">{title}</h1>
            <div className="flex items-center text-text-400 gap-1">
                {totalRating !== 0 && (
                    <>
                        <Star className="fill-yellow-500 text-xs stroke-0" />
                        <p>{totalRating} Ratings</p>
                        <span className="px-1">-</span>
                        <p>{handleCounting(ratings.length)} Reviews</p>
                        <span className="px-1">-</span>
                    </>
                )}
                <p>{handleCounting(unitsSold)} Sold</p>
            </div>
        </div>
    );
}

export default ProductHeading;
