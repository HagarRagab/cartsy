import PageLayout from "@/app/_components/shared/PageLayout";
import ProductsContainer from "@/app/_components/shared/ProductsContainer";
import { getSearchProducts } from "@/app/_lib/data-service";

async function Page({ searchParams }) {
    const { search, category } = await searchParams;
    const searchKeyWords = search.toLowerCase().trim().split(" ");
    const products = await getSearchProducts(searchKeyWords, category);

    return (
        <PageLayout>
            {!products || !products.length ? (
                <div className="text-center">
                    No products match your request. Please search different
                    products
                </div>
            ) : (
                <ProductsContainer products={products} />
            )}
        </PageLayout>
    );
}

export default Page;
