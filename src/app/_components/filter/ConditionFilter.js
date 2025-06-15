"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { useSearch } from "@/src/app/_hooks/useSearch";
import FilterAccordionContainer from "@/src/app/_components/filter/FilterAccordionContainer";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { direction } from "../../_utils/helper";

function ConditionFilter({ label }) {
    const { setParam, deleteParam, getParam } = useSearch();
    const [condition, setCondition] = useState(() =>
        getParam("filteredcondition")
    );

    useEffect(() => {
        if (!condition) deleteParam("filteredcondition");
        else setParam("filteredcondition", condition);
    }, [condition]);

    const t = useTranslations("filter");
    const locale = useLocale();

    return (
        <FilterAccordionContainer label={label}>
            <RadioGroup
                value={condition}
                onValueChange={(value) => setCondition(value)}
                dir={direction(locale)}
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new">{t("new")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="used" id="used" />
                    <Label htmlFor="used">{t("used")}</Label>
                </div>
            </RadioGroup>
        </FilterAccordionContainer>
    );
}

export default ConditionFilter;
