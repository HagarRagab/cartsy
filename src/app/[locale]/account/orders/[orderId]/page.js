import { format } from "date-fns";

import OrderDetailsContainer from "@/src/app/_components/account/orders/OrderDetailsContainer";
import OrderDetailsItem from "@/src/app/_components/account/orders/OrderDetailsItem";
import OrderSummary from "@/src/app/_components/account/orders/OrderSummary";
import ReceiverInfo from "@/src/app/_components/account/orders/ReceiverInfo";
import PageHeader from "@/src/app/_components/shared/PageHeader";
import { getOrder } from "@/src/app/_lib/data-services/data-orders";
import { getTranslations } from "next-intl/server";

async function Page({ params }) {
    const { orderId } = await params;

    const order = await getOrder(orderId);

    const t = await getTranslations("orderDetails");

    const { orderNumber, created_at, status, items } = order;

    return (
        <div className="bg-bg-100 p-4 md:p-6 rounded-md">
            <PageHeader>{t("title")}</PageHeader>

            <div className="flex items-center gap-4 mb-4">
                <h2 className="flex items-center gap-2 text-lg md:text-xl">
                    <span className="font-semibold">{t("orderId")}:</span>
                    <span>#{orderNumber}</span>
                </h2>

                <div className="w-fit bg-primary-100 text-accent-200 px-6 py-1 rounded-full capitalize text-sm">
                    {t(status)}
                </div>
            </div>

            <p className="flex items-center gap-2 text-text-400">
                <span className="font-semibold">{t("createdAt")}:</span>
                <span>{format(created_at, "dd, MMMM yyyy k:m:s")}</span>
            </p>

            <OrderDetailsContainer title="Order items">
                <div className="flex flex-col gap-6">
                    {items.map((item) => (
                        <OrderDetailsItem
                            key={item.inventoryId}
                            item={item}
                            order={order}
                        />
                    ))}
                </div>
            </OrderDetailsContainer>

            <OrderDetailsContainer title={t("orderSummary")}>
                <OrderSummary order={order} />
            </OrderDetailsContainer>

            <OrderDetailsContainer title={t("receiverInfo")}>
                <ReceiverInfo order={order} />
            </OrderDetailsContainer>
        </div>
    );
}

export default Page;
