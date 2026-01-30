import OrderItem from "@/src/app/_components/account/orders/OrderItem";
import OrdersFilter from "@/src/app/_components/account/orders/OrdersFilter";
import RateOrderMsg from "@/src/app/_components/account/orders/RateOrderMsg";
import PageHeader from "@/src/app/_components/shared/PageHeader";
import { getAllOrders } from "@/src/app/_lib/data-services/data-orders";
import { getAuthUser } from "@/src/app/_lib/data-services/data-user";
import { getTranslations } from "next-intl/server";

async function Page({ searchParams }) {
    const { status = "orders", period = "all" } = await searchParams;

    const authUser = await getAuthUser();

    const orders = await getAllOrders(authUser.id, status);

    const t = await getTranslations("myOrders");

    const filteredOrders =
        period === "all"
            ? orders
            : orders.filter((order) => {
                  const durations = {
                      lastMonth: new Date().getMonth() + 1,
                      thisYear: new Date().getFullYear(),
                      lastYear: new Date().getFullYear() - 1,
                  };

                  const orderMonth = new Date(order.created_at).getMonth() + 1;
                  const orderYear = new Date(order.created_at).getFullYear();

                  return (
                      (period === "lastMonth" &&
                          durations[period] === orderMonth) ||
                      (period === "thisYear" &&
                          durations[period] === orderYear) ||
                      (period === "lastYear" && durations[period] === orderYear)
                  );
              });

    return (
        <div className="flex flex-col gap-4 ">
            <PageHeader>
                <span>{t("title")}</span>
                <span className="text-base bg-bg-300 py-1 px-2 rounded-sm mx-2">
                    {filteredOrders.length}
                </span>
            </PageHeader>

            <OrdersFilter />

            <RateOrderMsg />

            <div className="flex flex-col gap-4 bg-bg-100 rounded-md p-0 md:p-8">
                {!filteredOrders || !filteredOrders.length ? (
                    <p className="text-xl font-semibold mx-auto">
                        {t("noOrders")}
                    </p>
                ) : (
                    filteredOrders.map((order) => (
                        <OrderItem key={order.id} order={order} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Page;
