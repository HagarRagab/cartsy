"use client";

import { useEffect, useState } from "react";

import { useSearch } from "@/app/_hooks/useSearch";
import FilterAccordionContainer from "@/app/_components/filter/FilterAccordionContainer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "next/navigation";

function ConditionFilter() {
    const searchParams = useSearchParams();
    const [condition, setCondition] = useState(() =>
        searchParams.get("filteredcondition")
    );

    const { setParam, deleteParam } = useSearch();

    useEffect(() => {
        if (!condition) deleteParam("filteredcondition");
        else setParam("filteredcondition", condition);
    }, [condition]);

    return (
        <FilterAccordionContainer label="condition">
            <RadioGroup
                value={condition}
                onValueChange={(value) => setCondition(value)}
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new">New</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="used" id="used" />
                    <Label htmlFor="used">Used</Label>
                </div>
            </RadioGroup>
        </FilterAccordionContainer>
    );
}

export default ConditionFilter;
