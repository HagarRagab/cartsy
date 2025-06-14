"use client";

import { Star } from "lucide-react";
import { useState } from "react";

function SelectRatingStars({
    rating,
    setRating,
    children = "",
    starSize = 18,
}) {
    const [tempRating, setTempRating] = useState(0);

    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => (
                <button
                    key={index}
                    onMouseOver={() => setTempRating(index + 1)}
                    onMouseLeave={() => setTempRating(0)}
                    onClick={() => setRating(index + 1)}
                >
                    <Star
                        size={starSize}
                        className={`stroke-0 ${
                            (tempRating >= index + 1 && !!tempRating) ||
                            (rating >= index + 1 && !tempRating)
                                ? "fill-yellow-500"
                                : "fill-bg-300"
                        }`}
                    />
                </button>
            ))}
            {children && children}
        </div>
    );
}

export default SelectRatingStars;
