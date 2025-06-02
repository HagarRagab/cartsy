"use client";

import { Trash } from "lucide-react";

import ConfirmAction from "@/src/app/_components/shared/ConfirmAction";
import { removeFromWishlistAction } from "@/src/app/_lib/actions";
import { Button } from "@/src/components/ui/button";
import { useTranslations } from "use-intl";

function WishAction({ likedProduct }) {
    async function onConfirm() {
        await removeFromWishlistAction(likedProduct.id, "/account/wishlist");
    }

    const t = useTranslations("wishList");

    return (
        <ConfirmAction
            onConfirm={onConfirm}
            btnStyle="ghost-btn mr-2 mt-2 sm:mr-4 sm:mt-4"
            message={t("deleteMsg")}
        >
            <Button>
                <Trash />
            </Button>
        </ConfirmAction>
    );
}

export default WishAction;
