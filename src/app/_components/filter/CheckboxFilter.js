"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

import FilterAccordionContainer from "@/src/app/_components/filter/FilterAccordionContainer";
import { Checkbox } from "@/src/components/ui/checkbox";
import { useSearch } from "@/src/app/_hooks/useSearch";

function CheckboxFilter({ items, label }) {
    const searchParams = useSearchParams();

    const [checkedItems, setCheckedItems] = useState(
        () =>
            searchParams.get(`filtered${label.toLowerCase()}`)?.split("-") || []
    );

    const { setParam, deleteParam } = useSearch();

    const locale = useLocale();

    function handleCheckItem(item) {
        const checkedItem = checkedItems.find((i) => i === item.slug);
        setCheckedItems((items) => {
            if (!checkedItem) return [...items, item.slug];
            else return items.filter((i) => i !== item.slug);
        });
    }

    useEffect(() => {
        if (!checkedItems.length) deleteParam(`filtered${label.toLowerCase()}`);
        else setParam(`filtered${label.toLowerCase()}`, checkedItems.join("-"));
    }, [checkedItems.length, label]);

    return (
        <FilterAccordionContainer label={label}>
            {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2 my-2">
                    <Checkbox
                        id={item.slug}
                        checked={checkedItems.includes(item.slug)}
                        onCheckedChange={() => handleCheckItem(item)}
                    />
                    <label
                        htmlFor={item.slug}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {item.name[locale] || item.name}
                    </label>
                </div>
            ))}
        </FilterAccordionContainer>
    );
}

export default CheckboxFilter;
