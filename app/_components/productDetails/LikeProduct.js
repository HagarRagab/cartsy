"use client";

import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";

import {
    addToWishlistAction,
    removeFromWishlistAction,
} from "@/app/_lib/actions";
import { Button } from "@/components/ui/button";

function LikeProduct({ likedProduct, productId, userId }) {
    const pathname = usePathname();

    const isLikedProduct = likedProduct.length > 0;

    async function handleWishlist() {
        if (!isLikedProduct)
            await addToWishlistAction(userId, productId, pathname);
        else await removeFromWishlistAction(likedProduct[0].id, pathname);
    }

    return (
        <Button className="accent-btn" onClick={handleWishlist}>
            <Heart className={`${isLikedProduct ? "fill-accent-200" : ""}`} />
            <span>Like</span>
        </Button>
    );
}

export default LikeProduct;
