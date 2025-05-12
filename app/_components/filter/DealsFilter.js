"use client";

import { useEffect, useState } from "react";

import FilterAccordionContainer from "@/app/_components/filter/FilterAccordionContainer";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/app/_hooks/useSearch";

function DealsFilter() {
    const searchParams = useSearchParams();

    const [isChecked, setIsChecked] = useState(
        () => searchParams.get("filtereddeals") || ""
    );

    const { setParam, deleteParam } = useSearch();

    useEffect(() => {
        if (!isChecked) deleteParam("filtereddeals");
        else setParam("filtereddeals", isChecked);
    }, [isChecked]);

    return (
        <FilterAccordionContainer label="deals">
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
                    On sale
                </label>
            </div>
        </FilterAccordionContainer>
    );
}

export default DealsFilter;
