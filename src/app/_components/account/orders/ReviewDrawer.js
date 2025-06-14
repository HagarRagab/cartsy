"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/src/components/ui/drawer";
import SelectRatingStars from "@/src/app/_components/shared/SelectRatingStars";
import { Textarea } from "@/src/components/ui/textarea";
import { addReviewAction, editReviewAction } from "@/src/app/_lib/actions";
import SpinnerIcon from "../../shared/SpinnerIcon";

function ReviewDrawer({ children, userId, productId, review }) {
    const [rating, setRating] = useState(review?.stars || 0);
    const [comment, setComment] = useState(review?.comment || "");
    const [isLoading, setIsLoading] = useState(false);

    const closeBtnRef = useRef();

    const pathname = usePathname();

    const locale = useLocale();

    async function submitReview(e, mode) {
        e.preventDefault();

        setIsLoading(true);
        if (mode === "submit") {
            const result = await addReviewAction(
                userId,
                {
                    productId,
                    stars: rating,
                    comment: comment.slice(0, 100),
                },
                pathname
            );
            toast(result.message[locale]);
        } else {
            const result = await editReviewAction(
                userId,
                productId,
                {
                    stars: rating,
                    comment: comment.slice(0, 100),
                },
                pathname
            );
            toast(result.message[locale]);
        }

        setIsLoading(false);
        closeBtnRef.current.click();
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Rate & Review</DrawerTitle>
                        <DrawerDescription>
                            Set your review for this product.
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="p-4 pb-0">
                        <div className="flex flex-col gap-3 items-center justify-center space-x-2">
                            <SelectRatingStars
                                rating={rating}
                                setRating={setRating}
                                starSize={30}
                            />
                            <Textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add your review"
                                className="h-30"
                            />
                        </div>
                    </div>

                    <DrawerFooter>
                        <Button
                            className="primary-btn"
                            onClick={(e) =>
                                submitReview(e, !review ? "submit" : "edit")
                            }
                        >
                            {isLoading ? (
                                <SpinnerIcon />
                            ) : !review ? (
                                "Submit"
                            ) : (
                                "Edit"
                            )}
                        </Button>
                        <DrawerClose asChild>
                            <Button ref={closeBtnRef} className="cancel-btn">
                                Cancel
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default ReviewDrawer;
