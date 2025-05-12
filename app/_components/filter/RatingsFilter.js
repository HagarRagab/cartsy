"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import FilterAccordionContainer from "@/app/_components/filter/FilterAccordionContainer";
import SelectRatingStars from "@/app/_components/filter/SelectRatingStars";
import { useSearch } from "@/app/_hooks/useSearch";

function RatingsFilter() {
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
        <FilterAccordionContainer label="ratings">
            <SelectRatingStars rating={rating} setRating={setRating} />
        </FilterAccordionContainer>
    );
}

export default RatingsFilter;
