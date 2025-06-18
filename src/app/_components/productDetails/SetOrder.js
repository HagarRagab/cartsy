"use client";

import { isPast } from "date-fns";
import { MessageCircleWarning, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { useAuth } from "@/src/app/_context/AuthContext";
import DiscountLabel from "@/src/app/_components/productDetails/DiscountLabel";
import LikeProduct from "@/src/app/_components/productDetails/LikeProduct";
import ProductPurchaseBox from "@/src/app/_components/productDetails/ProductPurchaseBox";
import { Button } from "@/src/components/ui/button";
import ShareProductLinks from "@/src/app/_components/productDetails/ShareProductLinks";

function SetOrder({
    product,
    selectedInventory,
    selectedVariant,
    discount,
    likedProduct,
}) {
    // Check if this product has valid discount
    const isDiscountValid = !discount
        ? false
        : !isPast(new Date(discount?.endDate));

    const { user } = useAuth();

    const t = useTranslations("productDetails");

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
                            src={selectedVariant.images[0]}
                            alt={selectedVariant.color}
                            className="object-contain border-2 border-text-600 rounded-sm px-2"
                            fill
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-text-400 mr-1">
                            {t("selectedSize")}:
                        </span>
                        <span className="uppercase font-semibold text-base">
                            {selectedInventory.size}
                        </span>
                    </div>
                </div>

                {!product.hasStock ? (
                    <div className="mt-4 text-center border-2 border-bg-300 rounded-md p-2">
                        <MessageCircleWarning size={20} className="mx-auto" />
                        <h3 className="font-semibold my-2">
                            {t("outOfStock")}
                        </h3>
                        <p>{t("outOfStockMsg")}</p>
                    </div>
                ) : (
                    <>
                        <ProductPurchaseBox
                            product={product}
                            inventory={selectedInventory}
                            discount={discount}
                            isDiscountValid={isDiscountValid}
                        />

                        <div className="mt-4 flex gap-2">
                            <ShareProductLinks product={product}>
                                <Button className="accent-btn">
                                    <Share2 />
                                    <span>{t("share")}</span>
                                </Button>
                            </ShareProductLinks>
                            {user && (
                                <LikeProduct
                                    productId={product.id}
                                    userId={user.id}
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
