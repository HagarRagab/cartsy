import NoResult from "@/app/_components/shared/NoResult";
import ProductCard from "@/app/_components/shared/ProductCard";
import WishActions from "@/app/_components/wishlist/WishActions";
import { getAuthUser, getLikedProducts } from "@/app/_lib/data-service";
import addToWishlist from "@/public/add-to-wishlist.png";
import Image from "next/image";

async function Page() {
    const authUser = await getAuthUser();
    const likedProducts = await getLikedProducts(authUser.id);

    return (
        <div className="flex flex-col gap-3 bg-bg-100 p-6 rounded-md">
            <h1 className="font-semibold text-lg mb-2">
                Wish list <span>({likedProducts.length})</span>
            </h1>

            {!likedProducts.length ? (
                <NoResult
                    imgSrc={addToWishlist.src}
                    alt="empty wishlist"
                    title="Empty wish list"
                    subTitle="Start adding items to your wishlist"
                />
            ) : (
                likedProducts.map((product) => (
                    <ProductCard
                        product={product.product}
                        key={product.id}
                        page="wishlist"
                        containerStyle="w-full flex items-center"
                        linkStyle="grid grid-cols-[150px_1fr] items-center gap-2"
                    >
                        <WishActions likedProductId={likedProducts[0].id} />
                    </ProductCard>
                ))
            )}
        </div>
    );
}

export default Page;
