"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import FilterAccordionContainer from "@/src/app/_components/filter/FilterAccordionContainer";
import { Slider } from "@/src/components/ui/slider";
import { useSearch } from "@/src/app/_hooks/useSearch";

const MIN_PRICE = 10;
const MAX_PRICE = 100000;

function PriceFilter({ label }) {
    const { setParam, deleteParam, getParam } = useSearch();

    const [range, setRange] = useState(
        () => getParam("filteredrange")?.split("-") || [MIN_PRICE, MAX_PRICE]
    );

    const t = useTranslations("filter");

    function handleSetRange() {
        if (range[0] === MIN_PRICE && range[1] === MAX_PRICE)
            deleteParam("filteredrange");
        else setParam("filteredrange", range.join("-"));
    }

    return (
        <FilterAccordionContainer label={label}>
            <div className="flex items-center justify-between gap-2 font-semibold">
                <span>{range[0]}</span>
                <span>
                    {range[1]} & {t("above")}
                </span>
            </div>
            <Slider
                defaultValue={range}
                onValueChange={(value) => setRange(value)}
                onValueCommit={handleSetRange}
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={1}
                className="my-3"
            />
        </FilterAccordionContainer>
    );
}

export default PriceFilter;
