"use client";

import { useState } from "react";

import InfoContainer from "@/src/app/_components/productDetails/InfoContainer";
import ProductModel from "@/src/app/_components/productDetails/ProductModel";
import { useSearch } from "@/src/app/_hooks/useSearch";

function ProductModels({ variants, selectedInventory }) {
    const { setParam, deleteParam, getParam } = useSearch();
    const [selectedVariantId, setSelectedVariantId] = useState(
        () =>
            +getParam("variant") ||
            selectedInventory?.variant.id ||
            variants[0].id
    );

    const selectedVariant = variants.find((v) => v.id === selectedVariantId);

    function handleSelectModel(variantId) {
        setSelectedVariantId(variantId);
        setParam("variant", variantId);
        deleteParam("inventory");
    }

    return (
        <InfoContainer
            titleKey="chooseColor"
            titleValue={`${selectedVariant?.color}`}
        >
            <ul className="flex items-center gap-2">
                {variants.map((variant) => (
                    <ProductModel
                        key={crypto.randomUUID()}
                        variant={variant}
                        onSelectModel={handleSelectModel}
                        selectedVariantId={selectedVariantId}
                    />
                ))}
            </ul>
        </InfoContainer>
    );
}

export default ProductModels;
