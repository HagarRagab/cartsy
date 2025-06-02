"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import FilterAccordionContainer from "@/src/app/_components/filter/FilterAccordionContainer";
import { Checkbox } from "@/src/components/ui/checkbox";
import { useSearch } from "@/src/app/_hooks/useSearch";

function DealsFilter({ label }) {
    const searchParams = useSearchParams();

    const [isChecked, setIsChecked] = useState(
        () => searchParams.get("filtereddeals") || ""
    );

    const { setParam, deleteParam } = useSearch();

    const t = useTranslations("filter");

    useEffect(() => {
        if (!isChecked) deleteParam("filtereddeals");
        else setParam("filtereddeals", isChecked);
    }, [isChecked]);

    return (
        <FilterAccordionContainer label={label}>
            <div className="flex items-center space-x-2 my-2">
                <Checkbox
                    id="onSale"
                    checked={isChecked === "true"}
                    onCheckedChange={() =>
                        setIsChecked((c) => (c === "true" ? "" : "true"))
                    }
                />
                <label
                    htmlFor="onSale"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {t("onSale")}
                </label>
            </div>
        </FilterAccordionContainer>
    );
}

export default DealsFilter;
