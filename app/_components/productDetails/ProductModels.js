"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import InfoContainer from "@/app/_components/productDetails/InfoContainer";
import ProductModel from "@/app/_components/productDetails/ProductModel";

function ProductModels({ variants, selectedVariant }) {
    const searchParams = useSearchParams();

    const params = new URLSearchParams(searchParams);
    const selectedVariantId = +params.get("variant") || variants[0].id;

    const router = useRouter();
    const pathname = usePathname();

    function handleSelectModel(variantId) {
        params.set("variant", variantId);
        params.delete("inventory");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <InfoContainer title={`Choose Color: ${selectedVariant.color}`}>
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
