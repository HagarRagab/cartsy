import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Dot } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

import { getInventory } from "@/src/app/_lib/data-services/data-product";
import { MAX_HISTORY_ORDERS_IMGS } from "@/src/app/_utils/constants";
import { Button } from "@/src/components/ui/button";

async function OrderItem({ order }) {
    const locale = await getLocale();
    const { id, items, status, deliveryEstimate } = order;

    const inventories = await Promise.all(
        items
            .slice(0, MAX_HISTORY_ORDERS_IMGS)
            .map((item) => getInventory(item.inventoryId))
    );

    return (
        <div className="bg-bg-100 p-3 md:p-6 rounded-md hover:border-l-4 hover:border-l-primary-200 transition-all grid grid-cols-[1fr_auto] gap-4 items-center shadow-lg">
            <div
                className={`col-span-full flex items-center capitalize ${
                    status !== "delivered" ? "text-accent-200" : "text-text-400"
                }`}
            >
                <Dot
                    className={`w-10 h-10 ${
                        status !== "delivered" ? "animate-pulse" : ""
                    }`}
                />
                {`${status} ${
                    status === "delivered"
                        ? `on ${format(deliveryEstimate, "dd, MMMM yyyy")}`
                        : ""
                }`}
            </div>

            <div className="flex items-center gap-4">
                {inventories.map((inventory) => (
                    <div key={inventory.id} className="w-20 h-20 relative">
                        <Image
                            src={inventory.variant.images[0]}
                            alt={`${inventory.variant.product.title[locale]} - ${inventory.variant.color}`}
                            className="absolute object-contain"
                            fill
                        />
                    </div>
                ))}

                {items.length > MAX_HISTORY_ORDERS_IMGS && (
                    <p className="text-xl text-accent-200">
                        +{items.length - MAX_HISTORY_ORDERS_IMGS}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                {status !== "delivered" && (
                    <Button className="primary-btn">Track order</Button>
                )}
                <Link
                    href={`/${locale}/account/orders/${id}`}
                    className="outline-btn w-full my-1 flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-sm"
                >
                    View order details
                </Link>
            </div>
        </div>
    );
}

export default OrderItem;
