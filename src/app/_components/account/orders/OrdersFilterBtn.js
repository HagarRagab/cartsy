"use client";

import { useSearch } from "@/src/app/_hooks/useSearch";
import { Button } from "@/src/components/ui/button";

function OrdersFilterBtn({ label, status }) {
    const { setParam, getParam } = useSearch();
    const currentStatus = getParam("status") || "orders";

    function selectOrderStatus(status) {
        setParam("status", status);
    }

    return (
        <Button
            variant="ghost"
            className={`min-w-25 ${
                currentStatus === status ? "bg-accent" : ""
            }`}
            onClick={() => selectOrderStatus(status)}
        >
            {label}
        </Button>
    );
}

export default OrdersFilterBtn;
