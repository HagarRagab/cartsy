"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import FilterAccordionContainer from "@/src/app/_components/filter/FilterAccordionContainer";
import SelectRatingStars from "@/src/app/_components/filter/SelectRatingStars";
import { useSearch } from "@/src/app/_hooks/useSearch";

function RatingsFilter({ label }) {
    const searchParams = useSearchParams();
    const [rating, setRating] = useState(() =>
        searchParams.get("filteredrating")
    );

    const { setParam, deleteParam } = useSearch();

    useEffect(() => {
        if (!rating) deleteParam("rating");
        else setParam("filteredrating", rating);
    }, [rating]);

    return (
        <FilterAccordionContainer label={label}>
            <SelectRatingStars rating={rating} setRating={setRating} />
        </FilterAccordionContainer>
    );
}

export default RatingsFilter;
