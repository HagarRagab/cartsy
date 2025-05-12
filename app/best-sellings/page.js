import PageLayout from "@/app/_components/shared/PageLayout";
import ProductsContainer from "@/app/_components/shared/ProductsContainer";
import { getBestSellings } from "@/app/_lib/data-service";
import NoResult from "../_components/shared/NoResult";
import noSearchResult from "@/public/no-search-result.png";

export const metadata = {
    title: "Best sellings",
};

async function Page({ searchParams }) {
    const {
        filteredbrands,
        filteredcategories,
        filtereddeals,
        filteredconditon,
        filteredrating,
        filteredrange,
    } = await searchParams;
    const products = await getBestSellings();

    const filteredProducts =
        !filteredbrands && !filteredcategories
            ? products
            : products.filter(
                  (p) =>
                      filteredbrands
                          ?.split("-")
                          .includes(p.brand.name.toLowerCase()) &&
                      filteredcategories
                          ?.split("-")
                          .includes(p.category.name.toLowerCase())
              );

    return (
        <PageLayout className="max-w-8xl" page="best sellings">
            {!filteredProducts.length ? (
                <NoResult
                    imgSrc={noSearchResult.src}
                    alt="no product found"
                    title="No product found"
                    subTitle="Adjust filter options"
                />
            ) : (
                <ProductsContainer
                    products={filteredProducts}
                    filteredrating={filteredrating}
                />
            )}
        </PageLayout>
    );
}

export default Page;
