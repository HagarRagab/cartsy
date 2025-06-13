import { format } from "date-fns";

import { getUser } from "@/src/app/_lib/data-services/data-user";
import UserAvatar from "@/src/app/_components/shared/UserAvatar";
import RatingStars from "@/src/app/_components/productDetails/RatingStars";

async function Review({ rate }) {
    const result = await getUser("id", rate.userId);
    const user = result[0];
    if (!user) return;

    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <UserAvatar user={user} />
                <p>{user?.userName}</p>
            </div>
            <RatingStars totalRating={rate.stars} />
            <p className="text-sm text-text-300 mt-2">
                Reviewed in {user?.country} on{" "}
                {format(new Date(rate.created_at), "MMM dd, yyy")}
            </p>
            <p className="font-semibold">{rate.comment}</p>
        </div>
    );
}

export default Review;
