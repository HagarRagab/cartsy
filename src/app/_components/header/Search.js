import { getLocale } from "next-intl/server";

import SearchForm from "@/src/app/_components/header/SearchForm";
import { getCategories } from "@/src/app/_lib/data-services/data-category";

async function Search() {
    const categories = await getCategories();
    const locale = await getLocale();

    return (
        <div className="max-w-2xl col-span-full col-start-1 lg:col-span-3 lg:col-start-3 row-start-2 lg:row-start-1 flex flex-1 w-full items-center border-2 border-text-400 rounded-sm mx-auto">
            <SearchForm categories={categories} locale={locale} />
        </div>
    );
}

export default Search;
