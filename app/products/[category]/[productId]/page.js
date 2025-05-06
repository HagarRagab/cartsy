import BreadCrumb from "@/app/_components/navbar/BreadCrumb";
import AboutProduct from "@/app/_components/productDetails/AboutProduct";
import CustomersReviews from "@/app/_components/productDetails/CustomersReviews";
import ProductDescription from "@/app/_components/productDetails/ProductDescription";
import ProductHeading from "@/app/_components/productDetails/ProductHeading";
import ProductImages from "@/app/_components/productDetails/ProductImages";
import ProductModels from "@/app/_components/productDetails/ProductModels";
import ProductSizes from "@/app/_components/productDetails/ProductSizes";
import SetOrder from "@/app/_components/productDetails/SetOrder";
import PageLayout from "@/app/_components/shared/PageLayout";
import {
    getCategory,
    getProductById,
    getProductInventories,
    getProductVariants,
    getRatings,
    getVariant,
} from "@/app/_lib/data-service";
import { notFound } from "next/navigation";

async function Page({ params, searchParams }) {
    const { category: categoryParam, productId } = await params;
    const product = await getProductById(productId);

    if (!product) notFound();

    const {
        title,
        description,
        categoryId,
        material,
        condition,
        unitsSold,
        brand,
    } = product;

    const category = await getCategory({ categoryId });
    if (category.slug !== categoryParam) notFound();

    const variants = await getProductVariants(productId);

    const { variant, inventory } = await searchParams;
    const selectedVariantId = !variant ? variants[0].id : Number(variant);
    const selectedVariant = await getVariant(selectedVariantId);

    const inventories = await getProductInventories(selectedVariantId);
    const selectedInventoryId = !inventory
        ? inventories[0].id
        : Number(inventory);

    const ratings = await getRatings(productId);

    const lang = "en";

    return (
        <PageLayout className="max-w-8xl">
            <BreadCrumb page={title[lang]} links={[category]} />
            <div className="grid grid-cols-[1fr_1fr_auto] gap-8 pb-8 border-b-2 border-text-500">
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
                        productId={productId}
                        brand={brand}
                    />
                    <ProductDescription description={description[lang]} />
                </div>
                <SetOrder selectedInventoryId={selectedInventoryId} />
            </div>
            <CustomersReviews ratings={ratings} />
        </PageLayout>
    );
}

export default Page;
