import AboutProduct from "@/src/app/_components/productDetails/AboutProduct";
import ProductDescription from "@/src/app/_components/productDetails/ProductDescription";
import ProductHeading from "@/src/app/_components/productDetails/ProductHeading";
import ProductImages from "@/src/app/_components/productDetails/ProductImages";
import ProductModels from "@/src/app/_components/productDetails/ProductModels";
import ProductSizes from "@/src/app/_components/productDetails/ProductSizes";

function ProductData({
    variants,
    product,
    ratings,
    inventories,
    selectedVariant,
    lang,
}) {
    const { id, title, description, material, condition, unitsSold, brand } =
        product;

    return (
        <>
            <ProductImages
                variants={variants}
                className="w-full max-w-lg mx-auto col-span-full lg:col-span-1"
            />
            <div className="flex flex-col gap-4">
                <ProductHeading
                    title={title[lang]}
                    unitsSold={unitsSold}
                    ratings={ratings}
                />
                <ProductSizes inventories={inventories} />
                {variants.length > 1 && (
                    <ProductModels
                        variants={variants}
                        selectedVariant={selectedVariant}
                    />
                )}
                <AboutProduct
                    material={material}
                    condition={condition}
                    productId={id}
                    brand={brand}
                />
                <ProductDescription description={description[lang]} />
            </div>
        </>
    );
}

export default ProductData;
