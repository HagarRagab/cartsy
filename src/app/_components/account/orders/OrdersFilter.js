import { getTranslations } from "next-intl/server";

import OrdersFilterBtn from "@/src/app/_components/account/orders/OrdersFilterBtn";
import OrdersFilterSelect from "@/src/app/_components/account/orders/OrdersFilterSelect";

async function OrdersFilter() {
    const t = await getTranslations("myOrders");

    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 bg-bg-100 p-2 rounded-md w-fit">
                <OrdersFilterBtn label={t("orders")} status="orders" />
                <OrdersFilterBtn label={t("notShipped")} status="ordered" />
                <OrdersFilterBtn label={t("shipped")} status="shipped" />
                <OrdersFilterBtn label={t("delivered")} status="delivered" />
            </div>

            <OrdersFilterSelect />
        </div>
    );
}

export default OrdersFilter;
