"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "use-intl";

import VariantLabel from "@/src/app/_components/cart/VariantLabel";
import ProductImages from "@/src/app/_components/productDetails/ProductImages";
import ProductModels from "@/src/app/_components/productDetails/ProductModels";
import ProductSizes from "@/src/app/_components/productDetails/ProductSizes";
import PriceLabel from "@/src/app/_components/shared/PriceLabel";
import SubmitBtn from "@/src/app/_components/shared/SubmitBtn";
import { updateCartItemAction } from "@/src/app/_lib/actions";
import { Button } from "@/src/components/ui/button";
import ProductTitle from "@/src/app/_components/shared/ProductTitle";
import { useCart } from "../../_context/CartContext";

function ProductOptions({
    variants,
    inventory,
    productInventories,
    discount,
    isDiscountValid,
    cartItemId,
    product,
}) {
    const dialogRef = useRef();
    const { isLoading, setIsLoading } = useCart();

    const t = useTranslations("general");
    const locale = useLocale("");

    const [selectedVariant, setSelectedVariant] = useState(inventory.variant);

    const variantInventories = productInventories
        .flat()
        .filter((inventory) => inventory.variantId === selectedVariant.id);

    const [selectedInventory, setSelectedInventory] = useState(inventory);

    useEffect(() => {
        const sameSizeInventory = variantInventories.find(
            (inventory) => inventory.size === selectedInventory.size,
        );
        if (!sameSizeInventory) setSelectedInventory(variantInventories[0]);
        else setSelectedInventory(sameSizeInventory);
    }, [selectedVariant.id]);

    async function handleEditCartItem(e) {
        e.preventDefault();
        setIsLoading(true);
        await updateCartItemAction(locale, cartItemId, {
            inventoryId: selectedInventory.id,
        });
        setIsLoading(false);
        dialogRef.current.close();
    }

    function openProductModal() {
        dialogRef.current.showModal();
    }

    return (
        <div className="w-fit flex flex-col xs:flex-row items-center gap-2">
            <VariantLabel
                label={`${t("size")}:`}
                value={inventory.size}
                onOpenModal={openProductModal}
            />
            <VariantLabel
                label={`${t("color")}:`}
                value={inventory.variant.color}
                onOpenModal={openProductModal}
            />

            <dialog
                ref={dialogRef}
                className="bg-bg-100 p-6 m-auto w-[90%] max-w-3xl rounded-md"
            >
                <form method="dialog" className="flex flex-col gap-2">
                    <Button
                        variant="ghost"
                        className="cursor-pointer hover:bg-transparent hover:scale-125 transition-all origin-center self-end"
                    >
                        <X size={15} />
                    </Button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ProductImages
                        variants={variants}
                        className="w-full max-w-lg mx-auto col-span-full lg:col-span-1"
                    />
                    <div className="col-span-2 lg:col-span-1 items-center lg:items-start text-center lg:text-start flex flex-col gap-4">
                        <ProductTitle product={product} />
                        <PriceLabel
                            price={selectedInventory.price}
                            discount={discount?.percentage}
                            isDiscountValid={isDiscountValid}
                        />
                        <ProductSizes
                            inventories={variantInventories}
                            selectedInventory={selectedInventory}
                            onSelectInventory={setSelectedInventory}
                        />
                        {variants.length > 1 && (
                            <ProductModels
                                variants={variants}
                                selectedVariant={selectedVariant}
                                onSelectVariant={setSelectedVariant}
                                onSelectInventory={setSelectedInventory}
                            />
                        )}
                        <SubmitBtn
                            isLoading={isLoading}
                            onClick={handleEditCartItem}
                            btnClass="primary-btn w-full"
                        >
                            Apply
                        </SubmitBtn>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default ProductOptions;
