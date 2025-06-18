"use client";

import InfoContainer from "@/src/app/_components/productDetails/InfoContainer";
import ProductModel from "@/src/app/_components/productDetails/ProductModel";

function ProductModels({ variants, selectedVariant, onSelectVariant }) {
    return (
        <InfoContainer
            titleKey="chooseColor"
            titleValue={`${selectedVariant?.color}`}
        >
            <ul className="flex items-center gap-2">
                {variants.map((variant) => (
                    <ProductModel
                        key={variant.id}
                        variant={variant}
                        onSelectVariant={onSelectVariant}
                        selectedVariant={selectedVariant}
                    />
                ))}
            </ul>
        </InfoContainer>
    );
}

export default ProductModels;
