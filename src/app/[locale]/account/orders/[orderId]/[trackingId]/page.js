import { format } from "date-fns";
import { getTranslations } from "next-intl/server";

import PageHeader from "@/src/app/_components/shared/PageHeader";
import { getOrder } from "@/src/app/_lib/data-services/data-orders";
import TrackingSpot from "@/src/app/_components/account/orders/TrackingSpot";

async function Page({ params }) {
    const { orderId } = await params;

    const order = await getOrder(orderId);

    const t = await getTranslations("orderTracking");

    const { status, created_at, deliveryEstimate, trackingId } = order;

    return (
        <div className="overflow-hidden">
            <PageHeader>{t("title")}</PageHeader>

            <div className="flex items-center gap-4 mb-4">
                <h2 className="flex items-center gap-2 text-lg md:text-xl">
                    <span className="font-semibold">{t("trackingId")}:</span>
                    <span>
                        {trackingId ? (
                            <span>#{trackingId}</span>
                        ) : (
                            <span className="text-base">{t("notShipped")}</span>
                        )}
                    </span>
                </h2>

                <div className="w-fit bg-primary-100 text-accent-200 px-6 py-1 rounded-full capitalize text-sm">
                    {t(status)}
                </div>
            </div>

            <div className="bg-bg-100 px-4 pt-4 pb-10 rounded-md">
                <div className="flex items-center justify-between gap-2">
                    <p className="text-text-400">
                        {format(created_at, "dd, MMMM yyyy hh:mm:ss")}
                    </p>
                    <p className="text-text-400">
                        {format(deliveryEstimate, "dd, MMMM yyyy hh:mm:ss")}
                    </p>
                </div>

                <div className="flex justify-between gap-2 mt-4">
                    <TrackingSpot label="ordered" status={status} />
                    <TrackingSpot label="shipped" status={status} />
                    <TrackingSpot label="out for delivery" status={status} />
                    <TrackingSpot label="delivered" status={status} />
                </div>
                <div className="h-[1px] w-[calc(100%-80px)] mx-auto bg-bg-400 -mt-[21px]"></div>
            </div>
        </div>
    );
}

export default Page;
