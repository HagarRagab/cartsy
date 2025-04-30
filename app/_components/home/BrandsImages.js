import Image from "next/image";

function BrandsImages({ brands }) {
    return (
        <>
            {brands.map((brand) => (
                <Image
                    key={brand.id}
                    src={brand.image}
                    alt={brand.name}
                    width={18}
                    height={18}
                    className="w-18 h-18"
                />
            ))}
        </>
    );
}

export default BrandsImages;
