import SectionCard from "@/app/_components/home/SectionCard";
import { getBestSellings } from "@/app/_lib/data-service";
import ProductsContainer from "../shared/ProductsContainer";

async function BestSelling() {
    const bestSellingProducts = await getBestSellings(5);

    return (
        <SectionCard
            sectionTitle="best selling"
            showMoreBtn={true}
            href="/bestSellings"
        >
            <ProductsContainer products={bestSellingProducts} />
        </SectionCard>
    );
}

export default BestSelling;
