import { getProductShipping } from "@/app/_lib/data-service";
import InfoContainer from "@/app/_components/productDetails/InfoContainer";
import Info from "@/app/_components/productDetails/Info";

async function AboutProduct({ material, condition, brand, productId }) {
    const productShipping = await getProductShipping(productId);
    const {
        weight,
        dimensions: { length, width, height },
    } = productShipping;

    return (
        <InfoContainer title="About Item:">
            <ul className="grid grid-cols-2 gap-2">
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
