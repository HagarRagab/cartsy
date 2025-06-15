"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import FilterAccordionContainer from "@/src/app/_components/filter/FilterAccordionContainer";
import { Checkbox } from "@/src/components/ui/checkbox";
import { useSearch } from "@/src/app/_hooks/useSearch";

function DealsFilter({ label }) {
    const { setParam, deleteParam, getParam } = useSearch();

    const [isChecked, setIsChecked] = useState(
        () => getParam("filtereddeals") || ""
    );

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
