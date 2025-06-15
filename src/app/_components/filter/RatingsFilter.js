"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import FilterAccordionContainer from "@/src/app/_components/filter/FilterAccordionContainer";
import SelectRatingStars from "@/src/app/_components/shared/SelectRatingStars";
import { useSearch } from "@/src/app/_hooks/useSearch";

function RatingsFilter({ label }) {
    const { setParam, deleteParam, getParam } = useSearch();
    const [rating, setRating] = useState(() => getParam("filteredrating"));

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
