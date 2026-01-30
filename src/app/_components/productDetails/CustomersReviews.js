import { getTranslations } from "next-intl/server";

import Ratings from "@/src/app/_components/productDetails/Ratings";
import Review from "@/src/app/_components/productDetails/Review";

async function CustomersReviews({ ratings }) {
    const t = await getTranslations("productDetails");

    return (
        <div className="my-8 pb-8">
            <h2 className="w-fit font-semibold text-2xl">
                {t("reviewsTitle")}
            </h2>
            {!ratings.length ? (
                <p className="mx-auto mt-2 w-fit">{t("noReviews")}</p>
            ) : (
                <div className="pt-8 flex flex-col lg:flex-row gap-16">
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
