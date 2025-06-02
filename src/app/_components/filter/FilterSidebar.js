import { getTranslations } from "next-intl/server";

import PriceFilter from "@/src/app/_components/filter/PriceFilter";
import RatingsFilter from "@/src/app/_components/filter/RatingsFilter";
import { getBrands } from "@/src/app/_lib/data-services/data-brand";
import { getCategories } from "@/src/app/_lib/data-services/data-category";
import { Accordion } from "@/src/components/ui/accordion";
import CheckboxFilter from "@/src/app/_components/filter/CheckboxFilter";
import ConditionFilter from "@/src/app/_components/filter/ConditionFilter";
import DealsFilter from "@/src/app/_components/filter/DealsFilter";

async function FilterSidebar({ hideFilter }) {
    const brands = await getBrands();
    const categories = await getCategories();
    const t = await getTranslations("filter");

    return (
        <div className="sticky h-screen top-0 bottom-0 overflow-y-auto bg-bg-100 border border-bg-300 shadow-xl sm: px-4 md:px-8 py-2 md:py-6">
            <Accordion type="multiple" className="w-full">
                <CheckboxFilter label={t("brands")} items={brands} />
                {hideFilter !== "category" && (
                    <CheckboxFilter
                        label={t("categories")}
                        items={categories}
                    />
                )}
                {hideFilter !== "sale" && <DealsFilter label={t("deals")} />}
                <ConditionFilter label={t("condition")} />
                <RatingsFilter label={t("ratings")} />
                <PriceFilter label={t("price")} />
            </Accordion>
        </div>
    );
}

export default FilterSidebar;
