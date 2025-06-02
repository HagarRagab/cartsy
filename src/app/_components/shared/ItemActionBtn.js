"use client";

import { Button } from "@/src/components/ui/button";
import Link from "next/link";

function ItemActionBtn({ icon, label, style, onClick, link }) {
    if (link)
        return (
            <Link
                href={link}
                className={`${style} w-full my-1 flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md`}
            >
                {icon}
                <span>{label}</span>
            </Link>
        );

    return (
        <Button className={`${style} w-full my-1`} onClick={onClick}>
            {icon}
            <span>{label}</span>
        </Button>
    );
}

export default ItemActionBtn;
