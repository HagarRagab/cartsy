import { redirect } from "next/navigation";

import PageLayout from "@/src/app/_components/shared/PageLayout";
import { getSearchProducts } from "@/src/app/_lib/data-services/data-product";
import { getDiscounts } from "@/src/app/_lib/data-services/data-deals";
import { filterProducts } from "@/src/app/_utils/helper";
import { getTranslations } from "next-intl/server";

async function Page({ searchParams }) {
    const { search, category, ...searchValues } = await searchParams;

    if (!search) redirect("/");

    const searchKeyWords = search.toLowerCase().trim().split(" ");

    const products = await getSearchProducts(searchKeyWords, category);

    const productsIdsList = products.map((p) => p.id);

    const discounts = await getDiscounts("*", productsIdsList);

    const filteredProducts = filterProducts(products, discounts, searchValues);

    const t = await getTranslations("search");

    return (
        <PageLayout
            page={search}
            hideFilter="category"
            filteredProducts={filteredProducts}
            subTitle={t("noResultSubTitle")}
        />
    );
}

export default Page;
