import Advertisements from "@/src/app/_components/home/Advertisements";
import BestSelling from "@/src/app/_components/home/BestSelling";
import Brands from "@/src/app/_components/home/Brands";
import OnSale from "@/src/app/_components/home/OnSale";
import ShopByCategory from "@/src/app/_components/home/ShopByCategory";

export default async function Page({ params }) {
    const { locale } = await params;

    return (
        <>
            <Advertisements locale={locale} />
            <div className="max-w-7xl mx-auto grid grid-cols-[100%] gap-4 -mt-10 pb-12 relative z-20">
                <ShopByCategory locale={locale} />
                <Brands locale={locale} />
                <BestSelling />
                <OnSale />
            </div>
        </>
    );
}
