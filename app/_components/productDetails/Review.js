import UserAvatar from "@/app/_components/shared/UserAvatar";
import { getUser } from "@/app/_lib/data-service";
import RatingStars from "./RatingStars";
import { format } from "date-fns";

async function Review({ rate }) {
    const [user] = await getUser("id", rate.userId);

    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <UserAvatar />
                <p>{user.userName}</p>
            </div>
            <RatingStars totalRating={rate.stars} />
            <p className="text-sm text-text-300 mt-2">
                Reviewed in {user.country} on{" "}
                {format(new Date(rate.created_at), "MMM dd, yyy")}
            </p>
            <p className="font-semibold">{rate.comment}</p>
        </div>
    );
}

export default Review;
