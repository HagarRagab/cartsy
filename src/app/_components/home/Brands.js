import { getBrands } from "@/src/app/_lib/data-services/data-brand";
import BrandsImages from "@/src/app/_components/home/BrandsImages";
import SectionCard from "@/src/app/_components/home/SectionCard";

async function Brands() {
    const brands = await getBrands();

    return (
        <SectionCard className="h-20 md:h-30" dir="ltr">
            <div className="mask relative w-full h-full overflow-hidden">
                <div className="w-fit absolute flex items-center gap-4 md:gap-8 slider-animation">
                    <BrandsImages brands={brands} />
                    <BrandsImages brands={brands} />
                </div>
            </div>
        </SectionCard>
    );
}

export default Brands;
