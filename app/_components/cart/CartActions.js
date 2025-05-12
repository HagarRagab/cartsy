"use client";

import { useEffect, useState } from "react";
import { Trash } from "lucide-react";

import ConfirmRemoving from "../shared/ConfirmRemoving";
import Counter from "../shared/Counter";
import { removeCookieItem, updateCookieItemQuantity } from "@/app/_lib/actions";

function CartActions({ inventory, initQuantity, cookieItemId }) {
    const [quantity, setQuantity] = useState(initQuantity);

    useEffect(() => {
        async function updateCookie() {
            await updateCookieItemQuantity(quantity, cookieItemId);
        }
        updateCookie();
    }, [quantity, cookieItemId]);

    function onConfirmRemoving() {
        removeCookieItem(cookieItemId);
    }

    return (
        <div className="h-full ml-auto flex flex-col items-end justify-between">
            <ConfirmRemoving
                onConfirm={onConfirmRemoving}
                btnStyle="cursor-pointer hover:text-red-custom-100 transition-color"
            >
                <Trash size={17} />
            </ConfirmRemoving>
            <Counter
                stock={inventory.stock}
                quantity={quantity}
                setQuantity={setQuantity}
            />
        </div>
    );
}

export default CartActions;
