import Ratings from "@/app/_components/productDetails/Ratings";
import Review from "@/app/_components/productDetails/Review";

function CustomersReviews({ ratings }) {
    return (
        <div className="mt-8">
            <h2 className="font-semibold text-xl">Reviews</h2>
            {!ratings.length ? (
                <p className="mx-auto mt-2 w-fit">No reviews</p>
            ) : (
                <div className="pt-8 flex gap-12">
                    {ratings.length !== 0 && <Ratings ratings={ratings} />}
                    <div className="flex-1 flex flex-col gap-6">
                        {ratings.map((rate) => (
                            <Review rate={rate} key={rate.id} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomersReviews;
