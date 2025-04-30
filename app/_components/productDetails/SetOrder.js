import { isPast } from "date-fns";
import { Heart, Share2, ShoppingBag } from "lucide-react";
import Image from "next/image";

import DiscountLabel from "@/app/_components/productDetails/DiscountLabel";
import TotalItemPrice from "@/app/_components/productDetails/TotalItemPrice";
import { getDiscount, getInventory, getVariant } from "@/app/_lib/data-service";
import { Button } from "@/components/ui/button";

async function SetOrder({ selectedInventoryId }) {
    const inventory = await getInventory(selectedInventoryId);
    const variant = await getVariant(inventory.variantId);
    const discount = await getDiscount(variant.productId);
    const isDiscountValid = !discount
        ? false
        : !isPast(new Date(discount?.endDate));

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
                            className="object-contain border-2 border-text-600 rounded-sm"
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
                    currency={inventory.currency}
                    discount={discount?.percentage}
                    isDiscountValid={isDiscountValid}
                />

                <div className="border-b-2 border-text-600 py-4">
                    <Button className="primary-btn w-full">Buy now</Button>
                    <Button className="outline-btn w-full mt-2">
                        <ShoppingBag />
                        <span>Add to bag</span>
                    </Button>
                </div>

                <div className="mt-4">
                    <Button className="accent-btn">
                        <Share2 />
                        <span>Share product</span>
                    </Button>
                    <Button className="accent-btn">
                        <Heart />
                        <span>Like</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SetOrder;
