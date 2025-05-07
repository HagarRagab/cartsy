import SearchForm from "@/app/_components/header/SearchForm";
import { getCategories } from "@/app/_lib/data-service";

async function Search() {
    const categories = await getCategories();

    return (
        <div className="flex flex-1 max-w-lg items-center border-2 border-text-400 rounded-sm overflow-hidden mx-auto">
            <SearchForm categories={categories} />
        </div>
    );
}

export default Search;
