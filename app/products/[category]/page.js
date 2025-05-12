import BreadCrumb from "@/app/_components/navbar/BreadCrumb";
import PageLayout from "@/app/_components/shared/PageLayout";
import ProductsContainer from "@/app/_components/shared/ProductsContainer";
import {
    getCategories,
    getCategory,
    getProducts,
} from "@/app/_lib/data-service";

export async function generateStaticParams() {
    const categories = await getCategories();
    const values = categories.map((category) => {
        return { category: category.slug };
    });
    return values;
}

export async function generateMetadata({ params }) {
    const { category: categoryParam } = await params;
    const category = await getCategory({ categorySlug: categoryParam });
    return { title: category.name };
}

async function Page({ params }) {
    const { category: categoryParam } = await params;
    const category = await getCategory({ categorySlug: categoryParam });
    const products = await getProducts(category.id, "categoryId");

    return (
        <PageLayout
            className="max-w-8xl"
            hideFilter="category"
            page={category.name}
        >
            <ProductsContainer products={products} />
        </PageLayout>
    );
}

export default Page;
