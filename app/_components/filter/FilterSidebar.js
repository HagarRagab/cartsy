import PriceFilter from "@/app/_components/filter/PriceFilter";
import RatingsFilter from "@/app/_components/filter/RatingsFilter";
import { getBrands, getCategories } from "@/app/_lib/data-service";
import { Accordion } from "@/components/ui/accordion";
import CheckboxFilter from "@/app/_components/filter/CheckboxFilter";
import ConditionFilter from "@/app/_components/filter/ConditionFilter";
import DealsFilter from "@/app/_components/filter/DealsFilter";

async function FilterSidebar({ hideFilter }) {
    const brands = await getBrands();
    const categories = await getCategories();

    return (
        <div className="min-h-[calc(100vh-136px)] bg-bg-100 shadow-xl px-8 py-6">
            <Accordion type="multiple" collapsible="true" className="w-full">
                <CheckboxFilter label="brands" items={brands} />
                {hideFilter !== "category" && (
                    <CheckboxFilter label="categories" items={categories} />
                )}
                {hideFilter !== "sale" && <DealsFilter />}
                <ConditionFilter />
                <RatingsFilter />
                <PriceFilter />
            </Accordion>
        </div>
    );
}

export default FilterSidebar;
