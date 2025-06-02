"use client";

import { Button } from "@/src/components/ui/button";

function VariantLabel({ label, value, onOpenModal }) {
    function handleOpenModal(e) {
        e.stopPropagation();
        onOpenModal();
    }

    return (
        <Button
            className="bg-bg-200 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-text-200 hover:text-text-700 cursor-pointer flex justify-center gap-2 outline-btn text-sm sm:text-base"
            onClick={handleOpenModal}
        >
            <span>{label}</span>
            <span className="font-semibold">{value}</span>
        </Button>
    );
}

export default VariantLabel;
