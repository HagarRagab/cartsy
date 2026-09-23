"use client";

import { useOptimistic, useTransition } from "react";

import { selectionItemAction } from "@/src/app/_lib/actions";
import { Checkbox } from "@/src/components/ui/checkbox";
import { useCart } from "@/src/app/_context/CartContext";

function CheckCartItem({ item }) {
    const { optimisticSelectAll } = useCart();
    const [, startTransition] = useTransition();

    // Optimistic state for this individual item's checkbox; React discards it
    // once the action's revalidated render lands.
    const [optimisticChecked, setOptimisticChecked] = useOptimistic(
        item.isSelected,
        (_, next) => next
    );

    // While a select-all/deselect-all is in flight, reflect that target state;
    // otherwise show this item's own optimistic (or server) state.
    const displayChecked =
        optimisticSelectAll !== null ? optimisticSelectAll : optimisticChecked;

    function onSelect() {
        if (optimisticSelectAll !== null) return;

        const next = !displayChecked;
        startTransition(async () => {
            try {
                setOptimisticChecked(next);
                await selectionItemAction(item.id, { isSelected: next });
            } catch (error) {
                console.error(error);
            }
        });
    }

    return <Checkbox checked={displayChecked} onCheckedChange={onSelect} />;
}

export default CheckCartItem;
