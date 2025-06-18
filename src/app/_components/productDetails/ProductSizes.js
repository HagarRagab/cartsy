"use client";

import InfoContainer from "@/src/app/_components/productDetails/InfoContainer";

function ProductSizes({ inventories, selectedInventory, onSelectInventory }) {
    return (
        <InfoContainer titleKey="chooseSize">
            <ul className="flex items-center gap-2">
                {inventories?.map((inventory) => (
                    <li
                        key={inventory.id}
                        className={`w-12 text-sm aspect-square flex justify-center items-center rounded-sm transition-colors border-2 ${
                            inventory.stock < 1
                                ? "border-dashed text-text-500"
                                : "hover:border-text-200"
                        } ${
                            selectedInventory.id === inventory.id
                                ? "border-text-200"
                                : "border-text-600"
                        }`}
                    >
                        <button
                            className={`w-full h-full cursor-pointer disabled:cursor-not-allowed`}
                            disabled={inventory.stock < 1}
                            onClick={() => onSelectInventory(inventory)}
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
