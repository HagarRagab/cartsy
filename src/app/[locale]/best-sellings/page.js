import PageLayout from "@/src/app/_components/shared/PageLayout";
import { getDiscounts } from "@/src/app/_lib/data-services/data-deals";
import { getBestSellings } from "@/src/app/_lib/data-services/data-product";
import { filterProducts } from "@/src/app/_utils/helper";

export const metadata = {
    title: "Best sellings",
};

async function Page({ searchParams }) {
    const searchValues = await searchParams;

    const products = await getBestSellings();

    const productsIdsList = products.map((p) => p.id);

    const discounts = await getDiscounts("*", productsIdsList);

    const filteredProducts = filterProducts(products, discounts, searchValues);

    return (
        <PageLayout page="best sellings" filteredProducts={filteredProducts} />
    );
}

export default Page;
