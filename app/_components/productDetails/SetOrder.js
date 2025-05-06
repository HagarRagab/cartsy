import { isPast } from "date-fns";
import { Share2, ShoppingBag, ShoppingCart } from "lucide-react";
import Image from "next/image";

import DiscountLabel from "@/app/_components/productDetails/DiscountLabel";
import LikeProduct from "@/app/_components/productDetails/LikeProduct";
import TotalItemPrice from "@/app/_components/productDetails/TotalItemPrice";
import {
    checkIfProductIsLiked,
    getAuthUser,
    getDiscount,
    getInventory,
    getUser,
    getVariant,
} from "@/app/_lib/data-service";
import { convertCurrency } from "@/app/_utils/helper";
import { Button } from "@/components/ui/button";
import ItemActionBtn from "@/app/_components/shared/ItemActionBtn";

async function SetOrder({ selectedInventoryId }) {
    const inventory = await getInventory(selectedInventoryId);

    const variant = await getVariant(inventory.variantId);

    // Check if this product has valid discount
    const discount = await getDiscount(variant.productId);
    const isDiscountValid = !discount
        ? false
        : !isPast(new Date(discount?.endDate));

    // Get current user data
    const authUser = await getAuthUser();
    const user = authUser && (await getUser("email", authUser.email))[0];
    const userCurrency = user.currency || "USD";

    const currencyRate =
        inventory.currency === userCurrency
            ? null
            : await convertCurrency(inventory.currency, userCurrency);

    const likedProduct = await checkIfProductIsLiked(
        user.id,
        variant.productId
    );

    return (
        <div className="flex flex-col gap-4">
            {isDiscountValid && <DiscountLabel discount={discount} />}
            <div className="bg-bg-100 rounded-md p-8 h-fit">
                <h2 className="border-b-2 border-text-600 pb-2 font-semibold">
                    Set order
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
                    <div>
                        <span className="text-text-400 mr-1">
                            Selected size:
                        </span>
                        <span className="uppercase font-semibold text-md">
                            {inventory.size}
                        </span>
                    </div>
                </div>

                <TotalItemPrice
                    stock={inventory.stock}
                    price={inventory.price}
                    discount={discount?.percentage}
                    isDiscountValid={isDiscountValid}
                    productCurrency={inventory.currency}
                    userCurrency={userCurrency}
                    currencyRate={currencyRate}
                />

                <div className="border-b-2 border-text-600 py-4">
                    <ItemActionBtn
                        icon={<ShoppingBag />}
                        label="Buy now"
                        style="primary-btn"
                    />

                    <ItemActionBtn
                        icon={<ShoppingCart />}
                        label="Add to bag"
                        style="outline-btn"
                    />
                </div>

                <div className="mt-4 flex gap-2">
                    <Button className="accent-btn">
                        <Share2 />
                        <span>Share product</span>
                    </Button>
                    <LikeProduct
                        likedProduct={likedProduct}
                        productId={variant.productId}
                        userId={user.id}
                    />
                </div>
            </div>
        </div>
    );
}

export default SetOrder;
