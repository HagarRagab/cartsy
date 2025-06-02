import { getLikedProducts } from "@/src/app/_lib/data-services/data-product";
import { getAuthUser } from "@/src/app/_lib/data-services/data-user";
import NoResult from "@/src/app/_components/shared/NoResult";
import ProductCard from "@/src/app/_components/shared/ProductCard";
import WishAction from "@/src/app/_components/wishlist/WishAction";
import wishlistImg from "@/public/add-to-wishlist.png";
import { getTranslations } from "next-intl/server";

async function Page() {
    const authUser = await getAuthUser();
    const likedProducts = await getLikedProducts(authUser.id);

    const t = await getTranslations("wishList");

    return (
        <div className="w-full flex flex-col gap-3 bg-bg-100 p-3 md:p-6 rounded-md">
            <h1 className="font-semibold text-lg mb-2">
                {t("title")} <span>({likedProducts.length})</span>
            </h1>

            {!likedProducts.length ? (
                <NoResult
                    imgSrc={wishlistImg.src}
                    alt="empty wishlist"
                    title={t("empty")}
                    subTitle={t("startAdding")}
                />
            ) : (
                likedProducts.map((likedProduct) => (
                    <ProductCard
                        product={likedProduct.product}
                        key={likedProduct.id}
                        containerStyle="w-full flex"
                        innerContainerStyle="grid grid-cols-[90px_1fr_auto] xs:grid-cols-[150px_1fr_auto] gap-2"
                    >
                        <WishAction likedProduct={likedProduct} />
                    </ProductCard>
                ))
            )}
        </div>
    );
}

export default Page;
