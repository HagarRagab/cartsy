import { ShoppingCart, Trash } from "lucide-react";
import ConfirmRemoving from "@/app/_components/shared/ConfirmRemoving";
import ItemActionBtn from "@/app/_components/shared/ItemActionBtn";

function WishActions({ likedProductId }) {
    async function onConfirm() {
        await removeFromWishlistAction(likedProductId, "/account/wishlist");
    }

    return (
        <div className="max-w-30 mr-8">
            <ConfirmRemoving
                onConfirm={onConfirm}
                btnStyle="delete-btn w-full my-1"
            >
                <ItemActionBtn
                    icon={<Trash />}
                    label="Delete"
                    style="delete-btn"
                />
            </ConfirmRemoving>

            <ItemActionBtn
                icon={<ShoppingCart />}
                label="Add to bag"
                style="outline-btn"
            />
        </div>
    );
}

export default WishActions;
