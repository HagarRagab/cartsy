"use client";

import { Button } from "@/components/ui/button";

function VariantLabel({ label, value, onOpenModal }) {
    return (
        <>
            <Button
                className="bg-bg-200 px-4 py-2 rounded-full text-text-200 hover:text-text-700 cursor-pointer flex justify-start outline-btn"
                onClick={onOpenModal}
            >
                {label}
                <span className="ml-1 font-semibold max-w-30 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {value}
                </span>
            </Button>
        </>
    );
}

export default VariantLabel;
