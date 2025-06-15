"use client";

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
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="lastMonth">Last 30 days</SelectItem>
                    <SelectItem value="thisYear">This year</SelectItem>
                    <SelectItem value="lastYear">last year</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default OrdersFilterSelect;
