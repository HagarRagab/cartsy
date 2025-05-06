"use client";

import { removeFromWishlistAction } from "@/app/_lib/actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function ConfirmRemoveWishItem({ children, likedProductId }) {
    async function handleRemoveItem() {
        console.log("removed");
        await removeFromWishlistAction(likedProductId, "/account/wishlist");
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this item from your wish list.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cancel-btn">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="delete-btn"
                        onClick={handleRemoveItem}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ConfirmRemoveWishItem;
