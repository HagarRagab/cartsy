import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import SectionCard from "@/app/_components/home/SectionCard";
import { getCategories } from "@/app/_lib/data-service";

async function ShopByCategory() {
    const categories = await getCategories();

    return (
        <SectionCard sectionTitle="shop by category">
            <Carousel className="w-[calc(100%-80px)] mx-auto">
                <CarouselContent className="-ml-1">
                    {categories.map((ele) => (
                        <Link href={`/products/${ele.slug}`} key={ele.name}>
                            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 w-40 text-center group">
                                <div className="p-1">
                                    <Card className="h-50 bg-bg-200 border-0">
                                        <CardContent className="h-full flex flex-col items-center justify-center px-4 gap-4">
                                            <div className="w-full relative aspect-square">
                                                <Image
                                                    src={ele.image}
                                                    alt={ele.name}
                                                    fill
                                                    className="object-contain group-hover:scale-95 transition-all"
                                                />
                                            </div>
                                            <span className="font-semibold text-sm">
                                                {ele.name}
                                            </span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        </Link>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="cursor-pointer shadow-bg-300 shadow-lg" />
                <CarouselNext className="cursor-pointer shadow-bg-300 shadow-lg" />
            </Carousel>
        </SectionCard>
    );
}

export default ShopByCategory;
