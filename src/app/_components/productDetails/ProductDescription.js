import InfoContainer from "@/src/app/_components/productDetails/InfoContainer";

function ProductDescription({ description }) {
    return (
        <InfoContainer titleKey="description">
            <p className="text-text-400">{description}</p>
        </InfoContainer>
    );
}

export default ProductDescription;
