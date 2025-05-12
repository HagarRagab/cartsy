import AboutProduct from "./AboutProduct";
import ProductDescription from "./ProductDescription";
import ProductHeading from "./ProductHeading";
import ProductImages from "./ProductImages";
import ProductModels from "./ProductModels";
import ProductSizes from "./ProductSizes";

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
            <ProductImages variants={variants} />
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
