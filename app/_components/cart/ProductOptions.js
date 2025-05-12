"use client";

import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

import VariantLabel from "@/app/_components/cart/VariantLabel";
import ProductImages from "@/app/_components/productDetails/ProductImages";
import ProductModels from "@/app/_components/productDetails/ProductModels";
import ProductSizes from "@/app/_components/productDetails/ProductSizes";
import PriceLabel from "@/app/_components/shared/PriceLabel";
import ProductTitle from "@/app/_components/shared/ProductTitle";
import { useSearch } from "@/app/_hooks/useSearch";
import { updateCookie } from "@/app/_lib/actions";
import { Button } from "@/components/ui/button";
import SubmitBtn from "../shared/SubmitBtn";

function ProductOptions({
    variants,
    inventories,
    inventory,
    discount,
    isDiscountValid,
    product,
    cookieItemId,
}) {
    const dialog = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    const { setParam, deleteParam } = useSearch();

    const userCurrency = "EGP";
    const currencyRate = null;
    const lang = "en";

    const productLink = `/products/${product.category.slug}/${product.id}`;

    async function handleEditCartItem(e) {
        e.preventDefault();

        const variantId = Number(searchParams.get("variant"));
        const defaultInventory = inventories.find(
            (i) => i.variantId === variantId
        );
        const inventoryId =
            Number(searchParams.get("inventory")) || defaultInventory.id;

        setIsLoading(true);

        await updateCookie(inventoryId, cookieItemId);

        deleteParam("variant");
        deleteParam("inventory");

        setIsLoading(false);

        dialog.current.close();
    }

    function openProductModal() {
        setParam("variant", inventory.variantId);
        dialog.current.showModal();
    }

    return (
        <div className="flex items-center gap-2">
            <VariantLabel
                label="size:"
                value={inventory.size}
                onOpenModal={openProductModal}
            />
            <VariantLabel
                label="color:"
                value={inventory.variant.color}
                onOpenModal={openProductModal}
            />

            <dialog
                ref={dialog}
                className="bg-bg-100 p-6 m-auto max-w-5xl rounded-md"
            >
                <form method="dialog" className="flex flex-col gap-2">
                    <Button
                        variant="ghost"
                        className="cursor-pointer hover:bg-transparent hover:scale-125 transition-all origin-center self-end"
                    >
                        <X size={15} />
                    </Button>
                </form>

                <div className="grid grid-cols-2 gap-4">
                    <ProductImages variants={variants} className="max-w-96" />
                    <div className="flex flex-col gap-3">
                        <ProductTitle
                            productLink={productLink}
                            title={product.title[lang]}
                        />
                        <PriceLabel
                            price={inventory.price}
                            discount={discount?.percentage}
                            isDiscountValid={isDiscountValid}
                            productCurrency={inventory.currency}
                            userCurrency={userCurrency}
                            currencyRate={currencyRate}
                        />
                        <ProductSizes inventories={inventories} />
                        {variants.length > 1 && (
                            <ProductModels
                                variants={variants}
                                selectedInventory={inventory}
                            />
                        )}

                        <SubmitBtn
                            label="Apply"
                            loadingLabel="Applying..."
                            isLoading={isLoading}
                            onClick={handleEditCartItem}
                        />
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default ProductOptions;
