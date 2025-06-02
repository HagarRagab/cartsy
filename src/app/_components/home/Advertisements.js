"use client";

import { useRef } from "react";
import Image from "next/image";

import { Card, CardContent } from "@/src/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/src/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ads } from "@/src/app/_utils/utils";
import { direction } from "@/src/app/_utils/helper";

function Advertisements({ locale }) {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

    return (
        <Carousel
            opts={{ direction: direction(locale) }}
            plugins={[plugin.current]}
        >
            <CarouselContent>
                {ads.map((ad) => (
                    <CarouselItem key={ad.title[locale]}>
                        <div>
                            <Card className="w-screen rounded-none border-0 pl-4 md:pl-12 py-0 bg-gradient">
                                <CardContent className="max-w-7xl w-full h-50 md:h-60 flex items-start justify-between px-0 mx-auto">
                                    <div className="md:text-4xl font-semibold pt-4 md:pt-8">
                                        {ad.date && (
                                            <p className="text-sm">{ad.date}</p>
                                        )}
                                        <p className="uppercase tracking-wider my-1 md:my-3">
                                            #
                                            {ad.title[locale]
                                                .split(" ")
                                                .join("_")}
                                        </p>
                                        <p className="text-xs sm:text-sm text-text-300 tracking-wider">
                                            {ad.description[locale]}
                                        </p>
                                        <div className="flex gap-1 items-center -mt-4 sm:mt-0">
                                            {ads.map((item) => (
                                                <span
                                                    key={
                                                        item.description[locale]
                                                    }
                                                    className={`block ${
                                                        item.title === ad.title
                                                            ? "w-4 bg-bg-700"
                                                            : "w-1 bg-bg-500"
                                                    } h-1 rounded-full mt-10`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-80 md:w-xl aspect-square relative z-10">
                                        <Image
                                            fill
                                            src={ad.image}
                                            alt={ad.title[locale]}
                                            className="object-contain object-center md:object-top"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex left-4 md:left-12 cursor-pointer" />
            <CarouselNext className="hidden sm:flex right-4 md:right-12 cursor-pointer" />
        </Carousel>
    );
}

export default Advertisements;
