"use client";

import { Button } from "@/components/ui/button";

function ItemActionBtn({ icon, label, style, onAddToCart }) {
    return (
        <Button className={`${style} w-full my-1`} onClick={onAddToCart}>
            {icon}
            <span>{label}</span>
        </Button>
    );
}

export default ItemActionBtn;
