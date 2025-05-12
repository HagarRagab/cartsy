import PageLayout from "@/app/_components/shared/PageLayout";
import ProductsContainer from "@/app/_components/shared/ProductsContainer";
import { getSearchProducts } from "@/app/_lib/data-service";
import { redirect } from "next/navigation";

import noSearch from "@/public/no-search-result.png";
import NoResult from "@/app/_components/shared/NoResult";

async function Page({ searchParams }) {
    const { search, category } = await searchParams;

    if (!search) redirect("/");

    const searchKeyWords = search.toLowerCase().trim().split(" ");
    const products = await getSearchProducts(searchKeyWords, category);

    return (
        <PageLayout page={search} hideFilter="category">
            {!products || !products.length ? (
                <NoResult
                    imgSrc={noSearch.src}
                    alt="no products found"
                    title="No products found"
                    subTitle="No products match your request. Please search different products"
                />
            ) : (
                <ProductsContainer products={products} />
            )}
        </PageLayout>
    );
}

export default Page;
