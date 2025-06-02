import FilterSidebar from "@/src/app/_components/filter/FilterSidebar";
import BreadCrumb from "@/src/app/_components/navbar/BreadCrumb";
import SheetFilter from "@/src/app/_components/shared/Sheet";
import NoResult from "@/src/app/_components/shared/NoResult";
import ProductsContainer from "@/src/app/_components/shared/ProductsContainer";
import noSearchResult from "@/public/no-search-result.png";
import { getTranslations } from "next-intl/server";

async function PageLayout({ filteredProducts, page, hideFilter, subTitle }) {
    const t = await getTranslations("search");

    return (
        <div className="sm:grid grid-cols-[250px_1fr]">
            <div className="hidden sm:block">
                <FilterSidebar hideFilter={hideFilter} />
            </div>

            <div className="block sm:hidden">
                <SheetFilter>
                    <FilterSidebar hideFilter={hideFilter} />
                </SheetFilter>
            </div>

            <div className="p-3 sm:p-8">
                <BreadCrumb page={page} />
                {!filteredProducts?.length ? (
                    <NoResult
                        imgSrc={noSearchResult.src}
                        alt={t("noResultTitle")}
                        title={t("noResultTitle")}
                        subTitle={subTitle || t("noResultSubTitleDefault")}
                    />
                ) : (
                    <ProductsContainer products={filteredProducts} />
                )}
            </div>
        </div>
    );
}

export default PageLayout;
