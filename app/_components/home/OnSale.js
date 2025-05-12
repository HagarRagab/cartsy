import { getDiscounts, getProductById } from "@/app/_lib/data-service";
import SectionCard from "@/app/_components/home/SectionCard";
import ProductsContainer from "../shared/ProductsContainer";

async function OnSale() {
    const discounts = await getDiscounts(5);
    const products = await Promise.all(
        discounts.map(
            async (discount) => await getProductById(discount.productId)
        )
    );

    return (
        <SectionCard sectionTitle="on sale" showMoreBtn={true} href="/on-sale">
            <ProductsContainer products={products} />
        </SectionCard>
    );
}

export default OnSale;
