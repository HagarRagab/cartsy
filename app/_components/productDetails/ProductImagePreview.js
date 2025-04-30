import Image from "next/image";

function ProductImagePreview({ image }) {
    return (
        <div className="relative w-full aspect-square">
            <Image
                src={image}
                alt=""
                fill
                priority
                className="object-contain border-text-600 border-2 rounded-md bg-white p-4"
            />
        </div>
    );
}

export default ProductImagePreview;
