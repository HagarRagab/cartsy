"use client";

import { useSearch } from "@/app/_hooks/useSearch";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "next/navigation";

function CheckItem({ label }) {
    const searchParams = useSearchParams();
    const { setParam, deleteParam } = useSearch();

    function handleSelect() {
        console.log("test");
        const selectType = searchParams.get("select");

        if (!selectType) setParam("select", "all");
        else deleteParam("select");
    }

    return (
        <div className="flex items-center space-x-2">
            <label
                htmlFor="select"
                className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>
            <Checkbox id="select" onClick={handleSelect} />
        </div>
    );
}

export default CheckItem;
