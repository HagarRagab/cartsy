import Advertisements from "@/app/_components/home/Advertisements";
import BestSelling from "@/app/_components/home/BestSelling";
import Brands from "@/app/_components/home/Brands";
import OnSale from "@/app/_components/home/OnSale";
import ShopByCategory from "@/app/_components/home/ShopByCategory";

export default async function Page() {
    return (
        <>
            <Advertisements />
            <div className="max-w-7xl mx-auto grid grid-cols-[100%] gap-4 -mt-10 pb-12 relative z-20">
                <ShopByCategory />
                <Brands />
                <BestSelling />
                <OnSale />
            </div>
        </>
    );
}
