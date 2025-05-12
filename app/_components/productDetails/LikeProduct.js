import { Heart } from "lucide-react";

import {
    addToWishlistAction,
    removeFromWishlistAction,
} from "@/app/_lib/actions";
import { Button } from "@/components/ui/button";
import { checkIfProductIsLiked } from "@/app/_lib/data-service";

async function LikeProduct({ productId, userId }) {
    const likedProduct = await checkIfProductIsLiked(userId, productId);

    const isLikedProduct = likedProduct.length > 0;

    const toggleWishlist = !isLikedProduct
        ? addToWishlistAction.bind(this, userId, productId, "/")
        : removeFromWishlistAction.bind(this, likedProduct[0].id, "/");

    return (
        <form action={toggleWishlist}>
            <Button className="accent-btn">
                <Heart
                    className={`${isLikedProduct ? "fill-accent-200" : ""}`}
                />
                <span>Like</span>
            </Button>
        </form>
    );
}

export default LikeProduct;
