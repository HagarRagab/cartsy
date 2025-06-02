import { getLocale, getTranslations } from "next-intl/server";

import SectionCard from "@/src/app/_components/home/SectionCard";
import { getBestSellings } from "@/src/app/_lib/data-services/data-product";
import ProductsContainer from "@/src/app/_components/shared/ProductsContainer";

async function BestSelling() {
    const bestSellingProducts = await getBestSellings(5);
    const locale = await getLocale();
    const t = await getTranslations("sectionCard");

    return (
        <SectionCard
            sectionTitleKey={"bestSelling"}
            showMoreBtn={true}
            href={`/${locale}/best-sellings`}
        >
            {bestSellingProducts.length === 0 || !bestSellingProducts ? (
                <p className="text-center text-lg">{t("noContect")}</p>
            ) : (
                <ProductsContainer products={bestSellingProducts} />
            )}
        </SectionCard>
    );
}

export default BestSelling;
