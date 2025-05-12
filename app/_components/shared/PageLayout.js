import FilterSidebar from "@/app/_components/filter/FilterSidebar";
import BreadCrumb from "@/app/_components/navbar/BreadCrumb";

function PageLayout({ children, page, links, hideFilter }) {
    return (
        <div className=" grid grid-cols-[250px_1fr]">
            <FilterSidebar hideFilter={hideFilter} />
            <div className="p-8">
                <BreadCrumb page={page} links={links} />
                {children}
            </div>
        </div>
    );
}

export default PageLayout;
