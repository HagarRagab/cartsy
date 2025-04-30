import InfoContainer from "./InfoContainer";

function ProductDescription({ description }) {
    return (
        <InfoContainer title="Description:">
            <p className="text-text-400">{description}</p>
        </InfoContainer>
    );
}

export default ProductDescription;
