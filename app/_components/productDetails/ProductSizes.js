"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import InfoContainer from "./InfoContainer";

function ProductSizes({ inventories }) {
    const searchParams = useSearchParams();

    const params = new URLSearchParams(searchParams);
    const selectedInventoryId = +params.get("inventory") || inventories[0].id;

    const router = useRouter();
    const pathname = usePathname();

    function handleSelectInventrory(inventoryId) {
        params.set("inventory", inventoryId);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <InfoContainer title="Choose Size:">
            <ul className="flex items-center gap-2">
                {inventories.map((inventory) => (
                    <li
                        key={inventory.id}
                        className={`w-12 text-sm aspect-square flex justify-center items-center rounded-sm transition-colors border-2 ${
                            inventory.stock < 1
                                ? "border-dashed text-text-500"
                                : "hover:border-text-200"
                        } ${
                            selectedInventoryId === inventory.id
                                ? "border-text-200"
                                : "border-text-600"
                        }`}
                    >
                        <button
                            className={`w-full h-full cursor-pointer disabled:cursor-not-allowed`}
                            disabled={inventory.stock < 1}
                            onClick={() => handleSelectInventrory(inventory.id)}
                        >
                            {inventory.size}
                        </button>
                    </li>
                ))}
            </ul>
        </InfoContainer>
    );
}

export default ProductSizes;

// ${
//                             choosenSize === size.size
//                                 ? "border-text-200"
//                                 : "border-text-600"
//                         }
