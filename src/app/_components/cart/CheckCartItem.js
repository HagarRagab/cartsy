"use client";

import { selectionItemAction } from "@/src/app/_lib/actions";
import { Checkbox } from "@/src/components/ui/checkbox";

function CheckCartItem({ item }) {
    async function onSelect(item) {
        await selectionItemAction(item.id, { isSelected: !item.isSelected });
    }

    return (
        <Checkbox
            checked={item.isSelected}
            onCheckedChange={() => onSelect(item)}
        />
    );
}

export default CheckCartItem;
