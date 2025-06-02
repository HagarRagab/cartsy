"use client";

import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/src/components/ui/carousel";
import { useState } from "react";
import ProductImageCard from "@/src/app/_components/productDetails/ProductImageCard";
import ProductImagePreview from "@/src/app/_components/productDetails/ProductImagePreview";

function ProductImages({ variants, className = "" }) {
    const [displayedImage, setDisplayedImage] = useState(variants[0].images[0]);

    return (
        <div className={className}>
            <ProductImagePreview image={displayedImage} />
            <Carousel className="sm:w-[calc(100%-80px)] mx-auto">
                <CarouselContent className="ml-0 sm:-ml-1">
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
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
    );
}

export default ProductImages;
