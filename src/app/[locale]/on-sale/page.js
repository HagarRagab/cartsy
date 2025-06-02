import PageLayout from "@/src/app/_components/shared/PageLayout";
import { getDiscounts } from "@/src/app/_lib/data-services/data-deals";
import { filterProducts } from "@/src/app/_utils/helper";

export const metadata = {
    title: "Deals",
};

async function Page({ searchParams }) {
    const searchValues = await searchParams;
    const discounts = await getDiscounts();
    const products = discounts.map((discount) => discount.product);
    const filteredProducts = filterProducts(products, undefined, searchValues);

    return (
        <PageLayout
            page="on sale"
            hideFilter="sale"
            filteredProducts={filteredProducts}
        />
    );
}

export default Page;
