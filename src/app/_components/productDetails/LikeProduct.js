import { Heart } from "lucide-react";

import {
    addToWishlistAction,
    removeFromWishlistAction,
} from "@/src/app/_lib/actions";
import { Button } from "@/src/components/ui/button";
import { checkIfProductIsLiked } from "@/src/app/_lib/data-services/data-product";

async function LikeProduct({ productId, userId, children, btnStyle = "" }) {
    const likedProduct = await checkIfProductIsLiked(userId, productId);

    const isLikedProduct = likedProduct.length > 0;

    const toggleWishlist = !isLikedProduct
        ? addToWishlistAction.bind(this, userId, productId)
        : removeFromWishlistAction.bind(this, likedProduct[0].id);

    return (
        <form action={toggleWishlist}>
            <Button className={btnStyle}>
                <Heart
                    className={`${
                        isLikedProduct
                            ? "text-red-custom-100 fill-red-custom-100"
                            : ""
                    }`}
                />
                {children}
            </Button>
        </form>
    );
}

export default LikeProduct;
