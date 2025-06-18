"use client";

import { useOptimistic, useTransition } from "react";
import { Heart } from "lucide-react";

import {
    addToWishlistAction,
    removeFromWishlistAction,
} from "@/src/app/_lib/actions";
import { Button } from "@/src/components/ui/button";

function LikeProduct({
    productId,
    userId,
    likedProduct,
    children,
    btnStyle = "",
}) {
    const [, startTransition] = useTransition();
    const [optimisticIsLiked, optimisticLike] = useOptimistic(
        likedProduct.length > 0,
        (currentLikeStatus) => !currentLikeStatus
    );

    async function toggleWishlist() {
        startTransition(async () => {
            try {
                optimisticLike();
                if (!optimisticIsLiked)
                    return await addToWishlistAction(userId, productId);
                else return await removeFromWishlistAction(likedProduct[0].id);
            } catch (error) {
                console.error("Cannot update like status");
            }
        });
    }

    return (
        <Button className={btnStyle} onClick={toggleWishlist}>
            <Heart
                className={`${
                    optimisticIsLiked
                        ? "text-red-custom-100 fill-red-custom-100"
                        : ""
                }`}
            />
            {children}
        </Button>
    );
}

export default LikeProduct;
