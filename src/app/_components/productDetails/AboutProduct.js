"use client";

import InfoContainer from "@/src/app/_components/productDetails/InfoContainer";
import Info from "@/src/app/_components/productDetails/Info";

function AboutProduct({ product, productShipping }) {
    const { material, condition, brand } = product;
    const {
        weight,
        dimensions: { length, width, height },
    } = productShipping;

    return (
        <InfoContainer titleKey="about">
            <ul className="grid  grid-cols-1 xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2">
                <Info title="material" info={material} />
                <Info title="condition" info={condition} />
                <Info title="brand" info={brand.name} />
                <Info title="weight" info={weight} />
                <Info
                    title="dimensions"
                    info={`${length} * ${width} * ${height}`}
                />
            </ul>
        </InfoContainer>
    );
}

export default AboutProduct;
