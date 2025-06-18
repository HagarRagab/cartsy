import { isPast } from "date-fns";
import { MessageCircleWarning, Share2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import DiscountLabel from "@/src/app/_components/productDetails/DiscountLabel";
import LikeProduct from "@/src/app/_components/productDetails/LikeProduct";
import ProductPurchaseBox from "@/src/app/_components/productDetails/ProductPurchaseBox";
import { getDiscount } from "@/src/app/_lib/data-services/data-deals";
import {
    checkIfProductIsLiked,
    getInventory,
    getProductById,
} from "@/src/app/_lib/data-services/data-product";
import { getAuthUser } from "@/src/app/_lib/data-services/data-user";
import { Button } from "@/src/components/ui/button";
import ShareProductLinks from "@/src/app/_components/productDetails/ShareProductLinks";

async function SetOrder({ selectedInventoryId }) {
    const inventory = await getInventory(selectedInventoryId);

    const variant = inventory.variant;
    const product = await getProductById(variant.productId);

    // Check if this product has valid discount
    const discount = await getDiscount(product.id);
    const isDiscountValid = !discount
        ? false
        : !isPast(new Date(discount?.endDate));

    // Get current user data
    const authUser = await getAuthUser();

    const likedProduct =
        authUser && (await checkIfProductIsLiked(authUser.id, product.id));

    const t = await getTranslations("productDetails");

    return (
        <div className="flex flex-col gap-4 max-w-full w-96 lg:w-fit">
            {isDiscountValid && <DiscountLabel discount={discount} />}
            <div className="bg-bg-100 rounded-md p-4 lg:p-8 h-fit border border-bg-300">
                <h2 className="border-b-2 border-text-600 pb-2 font-semibold">
                    {t("setOrder")}
                </h2>

                <div className="flex gap-2 items-center mt-4">
                    <div className="relative w-20 aspect-square">
                        <Image
                            src={variant.images[0]}
                            alt={variant.color}
                            className="object-contain border-2 border-text-600 rounded-sm px-2"
                            fill
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-text-400 mr-1">
                            {t("selectedSize")}:
                        </span>
                        <span className="uppercase font-semibold text-base">
                            {inventory.size}
                        </span>
                    </div>
                </div>

                {!product.hasStock ? (
                    <div className="mt-4 text-center border-2 border-bg-300 rounded-md p-2">
                        <MessageCircleWarning size={20} className="mx-auto" />
                        <h3 className="font-semibold my-2">Out of stock</h3>
                        <p>This product is currently out of stock</p>
                    </div>
                ) : (
                    <>
                        <ProductPurchaseBox
                            inventory={inventory}
                            discount={discount}
                            isDiscountValid={isDiscountValid}
                            selectedInventoryId={selectedInventoryId}
                            product={product}
                        />

                        <div className="mt-4 flex gap-2">
                            <ShareProductLinks product={product}>
                                <Button className="accent-btn">
                                    <Share2 />
                                    <span>{t("share")}</span>
                                </Button>
                            </ShareProductLinks>
                            {authUser && (
                                <LikeProduct
                                    productId={product.id}
                                    userId={authUser.id}
                                    likedProduct={likedProduct}
                                    btnStyle="accent-btn"
                                >
                                    <span>
                                        {likedProduct.length > 0
                                            ? t("liked")
                                            : t("like")}
                                    </span>
                                </LikeProduct>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SetOrder;
