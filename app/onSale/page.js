import BreadCrumb from "@/app/_components/navbar/BreadCrumb";
import PageLayout from "@/app/_components/shared/PageLayout";
import ProductsContainer from "@/app/_components/shared/ProductsContainer";
import { getDiscounts, getProductById } from "@/app/_lib/data-service";

export const metadata = {
    title: "Deals",
};

async function Page() {
    const discounts = await getDiscounts();
    const products = await Promise.all(
        discounts.map(
            async (discount) => await getProductById(discount.productId)
        )
    );

    return (
        <PageLayout className="max-w-8xl">
            <BreadCrumb page="On sale" />
            <ProductsContainer products={products} />
        </PageLayout>
    );
}

export default Page;
