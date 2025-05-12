"use client";

import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import ProductImageCard from "./ProductImageCard";
import ProductImagePreview from "./ProductImagePreview";

function ProductImages({ variants, className = "" }) {
    const [displayedImage, setDisplayedImage] = useState(variants[0].images[0]);

    return (
        <div className={className}>
            <ProductImagePreview image={displayedImage} />
            <Carousel className="w-[calc(100%-80px)] mx-auto">
                <CarouselContent className="-ml-1">
                    {variants.length !== 0 &&
                        variants.map((variant) => (
                            <ProductImageCard
                                key={crypto.randomUUID()}
                                images={variant.images}
                                alt={variant.color}
                                onSelectImage={setDisplayedImage}
                                displayedImage={displayedImage}
                            />
                        ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default ProductImages;
