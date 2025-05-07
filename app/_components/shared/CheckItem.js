"use client";

import { Checkbox } from "@/components/ui/checkbox";

function CheckItem({ label }) {
    return (
        <div className="flex items-center space-x-2">
            <label
                htmlFor="terms"
                className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>
            <Checkbox id="terms" />
        </div>
    );
}

export default CheckItem;
