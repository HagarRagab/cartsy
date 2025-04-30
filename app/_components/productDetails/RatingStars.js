import { Star } from "lucide-react";

function RatingStars({ totalRating }) {
    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => (
                <Star
                    key={index}
                    size={15}
                    className={`stroke-0 ${
                        index + 1 <= totalRating
                            ? "fill-yellow-500"
                            : "fill-bg-400"
                    }`}
                />
            ))}
        </div>
    );
}

export default RatingStars;
