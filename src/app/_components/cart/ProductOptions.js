"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

import VariantLabel from "@/src/app/_components/cart/VariantLabel";
import ProductImages from "@/src/app/_components/productDetails/ProductImages";
import ProductModels from "@/src/app/_components/productDetails/ProductModels";
import ProductSizes from "@/src/app/_components/productDetails/ProductSizes";
import PriceLabel from "@/src/app/_components/shared/PriceLabel";
import ProductTitle from "@/src/app/_components/shared/ProductTitle";
import SubmitBtn from "@/src/app/_components/shared/SubmitBtn";
import { useSearch } from "@/src/app/_hooks/useSearch";
import { Button } from "@/src/components/ui/button";
import { updateCartItemAction } from "@/src/app/_lib/actions";
import { useTranslations } from "use-intl";

function ProductOptions({
    variants,
    inventories,
    inventory,
    discount,
    isDiscountValid,
    product,
    cartItemId,
}) {
    const dialog = useRef();
    const modalWindow = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    const { setParam, deleteParam } = useSearch();

    const t = useTranslations("general");

    async function handleEditCartItem(e) {
        e.preventDefault();

        const variantId = Number(searchParams.get("variant"));
        const defaultInventory = inventories.find(
            (i) => i.variantId === variantId
        );
        const inventoryId =
            Number(searchParams.get("inventory")) || defaultInventory.id;

        setIsLoading(true);

        await updateCartItemAction(cartItemId, { inventoryId });

        deleteParam("variant");
        deleteParam("inventory");

        setIsLoading(false);

        dialog.current.close();
    }

    function openProductModal() {
        setParam("variant", inventory.variantId);
        dialog.current?.showModal();
    }

    useEffect(() => {
        modalWindow.current = document.getElementById("modal");
    }, []);

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

            {modalWindow.current &&
                createPortal(
                    <dialog
                        ref={dialog}
                        className="bg-bg-100 p-6 m-auto w-[90%] max-w-3xl max-h-2/3 sm:max-h-fit rounded-md"
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
                                className="max-w-96"
                            />
                            <div className="flex flex-col gap-3">
                                <ProductTitle product={product} />
                                <PriceLabel
                                    price={inventory.price}
                                    discount={discount?.percentage}
                                    isDiscountValid={isDiscountValid}
                                    productCurrency={inventory.currency}
                                />
                                <ProductSizes inventories={inventories} />
                                {variants.length > 1 && (
                                    <ProductModels
                                        variants={variants}
                                        selectedInventory={inventory}
                                    />
                                )}

                                <SubmitBtn
                                    isLoading={isLoading}
                                    onClick={handleEditCartItem}
                                    btnClass="primary-btn"
                                >
                                    Apply
                                </SubmitBtn>
                            </div>
                        </div>
                    </dialog>,
                    modalWindow.current
                )}
        </div>
    );
}

export default ProductOptions;
