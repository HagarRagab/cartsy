"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import InfoContainer from "@/app/_components/productDetails/InfoContainer";
import ProductModel from "@/app/_components/productDetails/ProductModel";
import { useSearch } from "@/app/_hooks/useSearch";

function ProductModels({ variants, selectedInventory }) {
    const searchParams = useSearchParams();
    const { setParam, deleteParam } = useSearch();

    const selectedVariantId =
        +searchParams.get("variant") ||
        selectedInventory?.variant.id ||
        variants[0].id;
    const selectedVariant = variants.find((v) => v.id === selectedVariantId);

    function handleSelectModel(variantId) {
        setParam("variant", variantId);
        deleteParam("inventory");
    }

    return (
        <InfoContainer title={`Choose Color: ${selectedVariant?.color}`}>
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
