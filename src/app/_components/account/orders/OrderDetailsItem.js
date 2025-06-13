import Image from "next/image";
import { getLocale } from "next-intl/server";

import { getInventory } from "@/src/app/_lib/data-services/data-product";
import FormattedPrice from "../../shared/FormattedPrice";
import { getCategory } from "@/src/app/_lib/data-services/data-category";
import Link from "next/link";

async function OrderDetailsItem({ item, currency }) {
    const { quantity, price, inventoryId } = item;
    const inventory = await getInventory(inventoryId);
    const { size, variant } = inventory;
    const { product } = variant;
    const category = await getCategory({ categoryId: product.categoryId });

    const locale = await getLocale();

    return (
        <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-3">
            <div className="relative w-20 h-20">
                <Image
                    src={variant.images[0]}
                    alt={product.title[locale]}
                    fill
                    className="absolute object-contain"
                    size={20}
                />
            </div>
            <div className="flex flex-col gap-2 justify-between">
                <Link
                    href={`/${locale}/products/${category.slug}/${product.id}`}
                    className="font-semibold"
                >
                    {product.title[locale]}
                </Link>
                <p className="flex items-center gap-6">
                    <span>{size}</span>
                    <span>{variant.color}</span>
                </p>
            </div>
            <div className="col-span-full sm:col-span-1 flex flex-wrap items-center gap-2 justify-end">
                <p className="w-35 text-center py-1 px-2 border-2 rounded-md">
                    {quantity} *{" "}
                    <FormattedPrice value={price} currency={currency} />
                </p>
                <p className="w-35 text-center py-1 px-2 border-2 rounded-md">
                    <FormattedPrice
                        value={quantity * price}
                        currency={currency}
                    />
                </p>
            </div>
        </div>
    );
}

export default OrderDetailsItem;
