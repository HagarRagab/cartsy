import { getBestSellings } from "@/app/_lib/data-service";
import ProductsContainer from "@/app/_components/shared/ProductsContainer";
import PageLayout from "@/app/_components/shared/PageLayout";
import BreadCrumb from "@/app/_components/navbar/BreadCrumb";

export const metadata = {
    title: "Best sellings",
};

async function Page() {
    const products = await getBestSellings();

    return (
        <PageLayout className="max-w-8xl">
            <BreadCrumb page="Best sellings" />
            <ProductsContainer products={products} />
        </PageLayout>
    );
}

export default Page;
