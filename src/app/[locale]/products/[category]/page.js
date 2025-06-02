import PageLayout from "@/src/app/_components/shared/PageLayout";
import { getDiscounts } from "@/src/app/_lib/data-services/data-deals";
import {
    getCategories,
    getCategory,
} from "@/src/app/_lib/data-services/data-category";
import { getProducts } from "@/src/app/_lib/data-services/data-product";
import { filterProducts } from "@/src/app/_utils/helper";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
    const categories = await getCategories();
    const values = categories.map((category) => {
        return { category: category.slug };
    });
    return values;
}

export async function generateMetadata({ params }) {
    const { category: categoryParam, locale } = await params;
    const category = await getCategory({ categorySlug: categoryParam });
    return { title: category.name[locale] };
}

async function Page({ params, searchParams }) {
    const { category: categoryParam, locale } = await params;

    const searchValues = await searchParams;

    const category = await getCategory({ categorySlug: categoryParam });

    const products = await getProducts(category.id, "categoryId");

    const productsIdsList = products.map((p) => p.id);

    const discounts = await getDiscounts("*", productsIdsList);

    const filteredProducts = filterProducts(products, discounts, searchValues);

    return (
        <PageLayout
            hideFilter="category"
            page={category.name[locale]}
            filteredProducts={filteredProducts}
        />
    );
}

export default Page;
