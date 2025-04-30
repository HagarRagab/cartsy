import { Button } from "@/components/ui/button";
import Image from "next/image";

function ProductModel({ variant, onSelectModel, selectedVariantId }) {
    return (
        <li className="w-20 relative aspect-square overflow-hidden">
            <Button
                onClick={() => onSelectModel(variant.id)}
                className="cursor-pointer overflow-hidden"
            >
                <Image
                    fill
                    src={variant.images[0]}
                    alt={variant.color}
                    className={`object-contain ${
                        selectedVariantId === variant.id
                            ? "border-text-200"
                            : "border-text-600"
                    } border-2 rounded-sm bg-white hover:border-text-200 transition-colors`}
                />
            </Button>
        </li>
    );
}

export default ProductModel;
