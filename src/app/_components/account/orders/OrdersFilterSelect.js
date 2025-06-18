"use client";

import { useTranslations } from "next-intl";

import { useSearch } from "@/src/app/_hooks/useSearch";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";

function OrdersFilterSelect() {
    const { setParam } = useSearch();
    const t = useTranslations("myOrders");

    function selectOrderPeriod(value) {
        setParam("period", value);
    }

    return (
        <Select defaultValue="thisYear" onValueChange={selectOrderPeriod}>
            <SelectTrigger className="w-[180px] bg-bg-100">
                <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="all">{t("all")}</SelectItem>
                    <SelectItem value="lastMonth">{t("lastMonth")}</SelectItem>
                    <SelectItem value="thisYear">{t("thisYear")}</SelectItem>
                    <SelectItem value="lastYear">{t("lastYear")}</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default OrdersFilterSelect;
