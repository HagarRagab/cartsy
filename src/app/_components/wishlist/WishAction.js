"use client";

import { Trash } from "lucide-react";

import ConfirmAction from "@/src/app/_components/shared/ConfirmAction";
import { removeFromWishlistAction } from "@/src/app/_lib/actions";
import { Button } from "@/src/components/ui/button";

function WishAction({ likedProduct }) {
    async function onConfirm() {
        await removeFromWishlistAction(likedProduct.id, "/account/wishlist");
    }

    return (
        <ConfirmAction
            onConfirm={onConfirm}
            btnStyle="ghost-btn mr-2 mt-2 sm:mr-4 sm:mt-4"
            message="You will delete this item from your wish list."
        >
            <Button>
                <Trash />
            </Button>
        </ConfirmAction>
    );
}

export default WishAction;
