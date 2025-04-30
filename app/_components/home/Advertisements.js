"use client";

import { useRef } from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const ads = [
    {
        date: "01 Oct - 31 Oct",
        title: "fashion day",
        description: "Discover fashion that suits your style",
        image: "/ad2.png",
    },
    {
        date: "11 Apr - 17 Apr",
        title: "save more",
        description: "10% off with your HSBC credit card. Min order 250 EGP",
        image: "/ad1.png",
    },
    {
        date: "",
        title: "free delivery",
        description: "Free delivery on first order. Cash on delivery.",
        image: "/ad3.png",
    },
];

function Advertisements() {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

    return (
        <Carousel plugins={[plugin.current]}>
            <CarouselContent>
                {ads.map((ad) => (
                    <CarouselItem key={ad.title}>
                        <div>
                            <Card className="w-screen rounded-none border-0 pl-12 py-0 bg-gradient">
                                <CardContent className="max-w-7xl w-full h-60 flex items-start justify-between px-0 mx-auto">
                                    <div className="text-4xl font-semibold pt-8">
                                        {ad.date && (
                                            <p className="text-sm">{ad.date}</p>
                                        )}
                                        <p className="uppercase tracking-wider my-3">
                                            #{ad.title.split(" ").join("")}
                                        </p>
                                        <p className="text-sm text-text-300 tracking-wider">
                                            {ad.description}
                                        </p>
                                        <div className="flex gap-1 items-center">
                                            {ads.map((item) => (
                                                <span
                                                    key={item.description}
                                                    className={`block ${
                                                        item.title === ad.title
                                                            ? "w-4 bg-bg-700"
                                                            : "w-1 bg-bg-500"
                                                    } h-1 rounded-full mt-10`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="h-full w-xl relative z-10">
                                        <Image
                                            fill
                                            src={ad.image}
                                            alt={ad.title}
                                            className="object-cover object-top"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-12 cursor-pointer" />
            <CarouselNext className="right-12 cursor-pointer" />
        </Carousel>
    );
}

export default Advertisements;
