"use client";

import { Minus, Plus } from "lucide-react";
import PlusMinusBtn from "@/src/app/_components/shared/PlusMinusBtn";

function Counter({ stock, quantity, onQuantityChange, children }) {
    function handleChangeQuantity(type) {
        if (type === "minus" && quantity > 1) onQuantityChange(quantity - 1);
        else if (type === "plus" && quantity < stock)
            onQuantityChange(quantity + 1);
    }

    return (
        <div className="flex items-center gap-2 border-2 border-text-600 rounded-sm w-fit overflow-hidden">
            {quantity === 1 && children ? (
                children
            ) : (
                <PlusMinusBtn
                    onClick={() => handleChangeQuantity("minus")}
                    icon={<Minus size={10} />}
                    disabled={quantity === 1}
                />
            )}
            {quantity}
            <PlusMinusBtn
                onClick={() => handleChangeQuantity("plus")}
                icon={<Plus size={10} />}
                disabled={stock === quantity}
            />
        </div>
    );
}

export default Counter;
