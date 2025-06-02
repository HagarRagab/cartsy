import { getLocale, getTranslations } from "next-intl/server";

import { getDiscounts } from "@/src/app/_lib/data-services/data-deals";
import SectionCard from "@/src/app/_components/home/SectionCard";
import ProductsContainer from "@/src/app/_components/shared/ProductsContainer";

async function OnSale() {
    const discounts = await getDiscounts(5);
    const products = discounts.map((discount) => discount.product);
    const t = await getTranslations("sectionCard");
    const locale = await getLocale();

    return (
        <SectionCard
            sectionTitleKey="onSale"
            showMoreBtn={true}
            href={`/${locale}/on-sale`}
        >
            {products.length === 0 ? (
                <p className="text-center text-lg">{t("noContent")}</p>
            ) : (
                <ProductsContainer products={products} />
            )}
        </SectionCard>
    );
}

export default OnSale;
