import Ratings from "@/app/_components/productDetails/Ratings";
import Review from "@/app/_components/productDetails/Review";

function CustomersReviews({ ratings }) {
    return (
        <div className="pt-8 flex gap-12">
            {ratings.length !== 0 && <Ratings ratings={ratings} />}
            <div className="flex-1 flex flex-col gap-6">
                {ratings.map((rate) => (
                    <Review rate={rate} key={rate.id} />
                ))}
            </div>
        </div>
    );
}

export default CustomersReviews;
