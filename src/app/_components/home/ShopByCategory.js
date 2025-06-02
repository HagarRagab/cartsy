import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/src/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/src/components/ui/carousel";
import SectionCard from "@/src/app/_components/home/SectionCard";
import { getCategories } from "@/src/app/_lib/data-services/data-category";
import { direction } from "@/src/app/_utils/helper";

async function ShopByCategory({ locale }) {
    const categories = await getCategories();

    return (
        <SectionCard sectionTitleKey="shopByCategory">
            <Carousel
                opts={{ direction: direction(locale) }}
                className="sm:w-[calc(100%-80px)] mx-auto"
            >
                <CarouselContent className="-ml-1">
                    {categories.map((ele) => (
                        <Link
                            href={`/${locale}/products/${ele.slug}`}
                            key={ele.name[locale]}
                        >
                            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 w-30 sm:w-40 text-center group">
                                <div className="p-1">
                                    <Card className="h-40 sm:h-50 bg-bg-200 border-0">
                                        <CardContent className="h-full flex flex-col items-center justify-center px-4 gap-4">
                                            <div className="w-full relative aspect-square">
                                                <Image
                                                    src={ele.image}
                                                    alt={ele.name[locale]}
                                                    fill
                                                    className="object-contain group-hover:scale-95 transition-all"
                                                />
                                            </div>
                                            <span className="font-semibold text-sm">
                                                {ele.name[locale]}
                                            </span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        </Link>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex not-only:cursor-pointer shadow-bg-300 shadow-lg" />
                <CarouselNext className="hidden sm:flex not-only:cursor-pointer shadow-bg-300 shadow-lg" />
            </Carousel>
        </SectionCard>
    );
}

export default ShopByCategory;
