import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { CarouselItem } from "@/src/components/ui/carousel";
import { Card, CardContent } from "@/src/components/ui/card";

function ProductImageCard({ images, alt, onSelectImage, displayedImage }) {
    return (
        <>
            {images.map((image) => (
                <CarouselItem
                    key={crypto.randomUUID()}
                    className="pl-1 max-w-25"
                >
                    <div className="p-1">
                        <Card className="bg-transparent border-0 shadow-none">
                            <CardContent className="relative w-full flex aspect-square items-center justify-center">
                                <Button
                                    key={crypto.randomUUID()}
                                    className="cursor-pointer"
                                    onClick={() => onSelectImage(image)}
                                >
                                    <Image
                                        src={image}
                                        alt={alt}
                                        fill
                                        className={`object-contain ${
                                            displayedImage === image
                                                ? "border-text-200"
                                                : "border-text-600"
                                        } border-2 rounded-md bg-white`}
                                    />
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
            ))}
        </>
    );
}

export default ProductImageCard;
