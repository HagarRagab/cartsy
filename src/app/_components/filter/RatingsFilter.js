"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import FilterAccordionContainer from "@/src/app/_components/filter/FilterAccordionContainer";
import SelectRatingStars from "@/src/app/_components/shared/SelectRatingStars";
import { useSearch } from "@/src/app/_hooks/useSearch";
import { useTranslations } from "next-intl";

function RatingsFilter({ label }) {
    const searchParams = useSearchParams();
    const [rating, setRating] = useState(() =>
        searchParams.get("filteredrating")
    );

    const { setParam, deleteParam } = useSearch();

    const t = useTranslations("filter");

    useEffect(() => {
        if (!rating) deleteParam("rating");
        else setParam("filteredrating", rating);
    }, [rating]);

    return (
        <FilterAccordionContainer label={label}>
            <SelectRatingStars rating={rating} setRating={setRating}>
                {!!rating && <span className="ml-2">& {t("up")}</span>}
            </SelectRatingStars>
        </FilterAccordionContainer>
    );
}

export default RatingsFilter;
