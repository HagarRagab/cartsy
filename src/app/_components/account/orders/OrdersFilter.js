import OrdersFilterBtn from "@/src/app/_components/account/orders/OrdersFilterBtn";
import OrdersFilterSelect from "@/src/app/_components/account/orders/OrdersFilterSelect";

function OrdersFilter() {
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 bg-bg-100 p-2 rounded-md w-fit">
                <OrdersFilterBtn label="Orders" status="orders" />
                <OrdersFilterBtn label="Not yet shipped" status="ordered" />
                <OrdersFilterBtn label="Shipped" status="shipped" />
                <OrdersFilterBtn label="Delivered" status="delivered" />
            </div>

            <OrdersFilterSelect />
        </div>
    );
}

export default OrdersFilter;
