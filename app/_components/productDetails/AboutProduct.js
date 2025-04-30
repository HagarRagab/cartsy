import { getProductShipping } from "@/app/_lib/data-service";
import InfoContainer from "./InfoContainer";

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
                <Info title="brand" info={brand} />
                <Info title="weight" info={weight} />
                <Info
                    title="dimensions"
                    info={`${length} * ${width} * ${height}`}
                />
            </ul>
        </InfoContainer>
    );
}

function Info({ title, info }) {
    return (
        <li>
            <span className="text-text-400 capitalize">{title}:</span>
            <span className="font-semibold ml-2">{info}</span>
        </li>
    );
}

export default AboutProduct;
