import OrderItem from "@/src/app/_components/account/orders/OrderItem";
import PageHeader from "@/src/app/_components/shared/PageHeader";
import { getAllOrders } from "@/src/app/_lib/data-services/data-orders";
import { getAuthUser } from "@/src/app/_lib/data-services/data-user";

async function Page() {
    const authUser = await getAuthUser();

    const orders = await getAllOrders(authUser.id);

    console.log(orders);

    return (
        <div className="flex flex-col gap-4">
            <PageHeader>Order history</PageHeader>
            {orders.map((order) => (
                <OrderItem key={order.id} order={order} />
            ))}
        </div>
    );
}

export default Page;
