import Image from "next/image";
import ProductCard from "@/app/_components/shared/ProductCard";
import { getAuthUser, getLikedProducts } from "@/app/_lib/data-service";
import addToWishlist from "@/public/add-to-wishlist.png";

async function Page() {
    const authUser = await getAuthUser();
    const likedProducts = await getLikedProducts(authUser.id);

    return (
        <div className="flex flex-col gap-3 bg-bg-100 p-6 rounded-md">
            <h1 className="font-semibold text-lg mb-2">
                Wish list <span>({likedProducts.length})</span>
            </h1>

            {!likedProducts.length ? (
                <>
                    <div className="relative w-45 mx-auto aspect-square">
                        <Image
                            fill
                            src={addToWishlist.src}
                            alt="Add to wishlist"
                        />
                    </div>
                    <p className="mx-auto font-semibold text-lg">
                        Start adding products to your wishlist
                    </p>
                </>
            ) : (
                likedProducts.map((product) => (
                    <ProductCard
                        product={product.product}
                        key={product.id}
                        page="wishlist"
                        likedProductId={likedProducts[0].id}
                    />
                ))
            )}
        </div>
    );
}

export default Page;
