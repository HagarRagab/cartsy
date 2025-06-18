import { Button } from "@/src/components/ui/button";
import Image from "next/image";

function ProductModel({ variant, onSelectVariant, selectedVariant }) {
    return (
        <li className="w-20 relative aspect-square overflow-hidden">
            <Button
                onClick={() => onSelectVariant(variant)}
                className="cursor-pointer overflow-hidden"
            >
                <Image
                    fill
                    src={variant.images[0]}
                    alt={variant.color}
                    className={`object-contain ${
                        selectedVariant.id === variant.id
                            ? "border-text-200"
                            : "border-text-600"
                    } border-2 rounded-sm bg-white hover:border-text-200 transition-colors`}
                />
            </Button>
        </li>
    );
}

export default ProductModel;
