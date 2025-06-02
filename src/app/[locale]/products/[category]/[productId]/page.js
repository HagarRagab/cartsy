import { notFound } from "next/navigation";

import CustomersReviews from "@/src/app/_components/productDetails/CustomersReviews";
import ProductData from "@/src/app/_components/productDetails/ProductData";
import SetOrder from "@/src/app/_components/productDetails/SetOrder";
import PageContainer from "@/src/app/_components/shared/PageContainer";
import {
    getProductById,
    getProductInventories,
    getProductVariants,
    getVariant,
    getRatings,
} from "@/src/app/_lib/data-services/data-product";
import BreadCrumb from "@/src/app/_components/navbar/BreadCrumb";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
    const { locale, productId } = await params;

    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const fullUrl = `${protocol}://${host}`;

    const product = await getProductById(productId);
    const productTitle = product.title[locale];
    const productDescription = product.description[locale];

    const productUrl = `${fullUrl}/${locale}/products/${product.category.slug}/${productId}`;
    const absoluteImageUrl = product.imagePreview;

    return {
        title: productTitle,
        description: productDescription,
        openGraph: {
            title: productTitle,
            description: productDescription,
            url: productUrl,
            images: [
                {
                    url: absoluteImageUrl,
                    width: 1200,
                    height: 630,
                    alt: productTitle,
                },
            ],
            type: "website",
        },
    };
}

async function Page({ params, searchParams }) {
    const { category: categoryParam, productId, locale } = await params;
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

    return (
        <PageContainer className="max-w-8xl">
            <BreadCrumb
                page={product.title[locale]}
                links={[
                    {
                        name: product.category.name[locale],
                        path: `/${locale}/products/${product.category.slug}`,
                    },
                ]}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_1fr_auto] gap-4 lg:gap-8 pb-8 border-b-2 border-text-500 justify-items-center">
                <ProductData
                    product={product}
                    selectedVariant={selectedVariant}
                    inventories={inventories}
                    variants={variants}
                    ratings={ratings}
                    lang={locale}
                />
                <SetOrder selectedInventoryId={selectedInventoryId} />
            </div>
            {!!ratings.length && <CustomersReviews ratings={ratings} />}
        </PageContainer>
    );
}

export default Page;
