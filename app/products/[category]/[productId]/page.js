import { notFound } from "next/navigation";

import BreadCrumb from "@/app/_components/navbar/BreadCrumb";
import CustomersReviews from "@/app/_components/productDetails/CustomersReviews";
import SetOrder from "@/app/_components/productDetails/SetOrder";
import PageLayout from "@/app/_components/shared/PageLayout";
import {
    getProductById,
    getProductInventories,
    getProductVariants,
    getRatings,
    getVariant,
} from "@/app/_lib/data-service";
import ProductData from "@/app/_components/productDetails/ProductData";

async function Page({ params, searchParams }) {
    const { category: categoryParam, productId } = await params;
    const product = await getProductById(productId);

    if (!product || product?.category?.slug !== categoryParam) notFound();

    const variants = await getProductVariants(productId);

    const { variant, inventory } = await searchParams;
    const selectedVariantId = !variant ? variants[0].id : Number(variant);
    const selectedVariant = await getVariant(selectedVariantId);

    const inventories = await getProductInventories(selectedVariantId);
    const selectedInventoryId = !inventory
        ? inventories[0].id // Default inventory
        : Number(inventory);

    const ratings = await getRatings(productId);

    const lang = "en";

    return (
        <PageLayout
            className="max-w-8xl"
            page={product.title[lang]}
            links={[product.category]}
        >
            <div className="grid grid-cols-[1fr_1fr_auto] gap-8 pb-8 border-b-2 border-text-500">
                <ProductData
                    product={product}
                    selectedVariant={selectedVariant}
                    inventories={inventories}
                    variants={variants}
                    ratings={ratings}
                    lang={lang}
                />
                <SetOrder selectedInventoryId={selectedInventoryId} />
            </div>
            {!!ratings.length && <CustomersReviews ratings={ratings} />}
        </PageLayout>
    );
}

export default Page;
