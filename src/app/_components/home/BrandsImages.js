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
                    className="w-11 h-11 md:w-18 md:h-18"
                />
            ))}
        </>
    );
}

export default BrandsImages;
