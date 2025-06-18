import { notFound } from "next/navigation";
import { headers } from "next/headers";

import CustomersReviews from "@/src/app/_components/productDetails/CustomersReviews";
import ProductData from "@/src/app/_components/productDetails/ProductData";

import PageContainer from "@/src/app/_components/shared/PageContainer";
import {
    getProductById,
    getVariantInventories,
    getProductVariants,
    getRatings,
    getProductShipping,
    checkIfProductIsLiked,
} from "@/src/app/_lib/data-services/data-product";
import BreadCrumb from "@/src/app/_components/navbar/BreadCrumb";
import { getDiscount } from "@/src/app/_lib/data-services/data-deals";
import { getAuthUser } from "@/src/app/_lib/data-services/data-user";

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

async function Page({ params }) {
    const { category: categoryParam, productId, locale } = await params;
    const product = await getProductById(productId);

    if (!product || product?.category?.slug !== categoryParam) notFound();

    // All product associated variants
    const variants = await getProductVariants(productId);

    // All inventories associated to each variant
    const productInventories = await Promise.all(
        variants.map((variant) => getVariantInventories(variant.id))
    );

    const productShipping = await getProductShipping(productId);

    const ratings = await getRatings(productId);

    const discount = await getDiscount(product.id);

    const authUser = await getAuthUser();

    const likedProduct =
        authUser && (await checkIfProductIsLiked(authUser.id, product.id));

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
            <ProductData
                product={product}
                productInventories={productInventories}
                variants={variants}
                ratings={ratings}
                lang={locale}
                productShipping={productShipping}
                discount={discount}
                likedProduct={likedProduct}
            />
            {!!ratings.length && <CustomersReviews ratings={ratings} />}
        </PageContainer>
    );
}

export default Page;
