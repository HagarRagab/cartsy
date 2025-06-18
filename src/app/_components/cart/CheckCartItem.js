"use client";

import { useState } from "react";

import { selectionItemAction } from "@/src/app/_lib/actions";
import { Checkbox } from "@/src/components/ui/checkbox";
import SpinnerIcon from "@/src/app/_components/shared/SpinnerIcon";

function CheckCartItem({ item }) {
    const [isLoading, setIsLoading] = useState(false);

    async function onSelect(item) {
        setIsLoading(true);
        await selectionItemAction(item.id, { isSelected: !item.isSelected });
        setIsLoading(false);
    }

    return (
        <>
            {isLoading ? (
                <SpinnerIcon />
            ) : (
                <Checkbox
                    checked={item.isSelected}
                    onCheckedChange={() => onSelect(item)}
                />
            )}
        </>
    );
}

export default CheckCartItem;
