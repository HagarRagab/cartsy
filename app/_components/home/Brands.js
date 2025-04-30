import { getBrands } from "@/app/_lib/data-service";
import BrandsImages from "./BrandsImages";
import SectionCard from "./SectionCard";

async function Brands() {
    const brands = await getBrands();

    return (
        <SectionCard className="h-30">
            <div className="mask relative w-full h-full overflow-hidden">
                <div className="w-fit absolute flex items-center gap-8 slider-animation">
                    <BrandsImages brands={brands} />
                    <BrandsImages brands={brands} />
                </div>
            </div>
        </SectionCard>
    );
}

export default Brands;
