"use client";

import { Button } from "@/components/ui/button";

function ItemActionBtn({ icon, label, style, ...props }) {
    return (
        <Button className={`${style} w-full my-1`} {...props}>
            {icon}
            <span>{label}</span>
        </Button>
    );
}

export default ItemActionBtn;
