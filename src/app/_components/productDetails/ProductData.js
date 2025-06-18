"use client";

import { useEffect, useState } from "react";

import AboutProduct from "@/src/app/_components/productDetails/AboutProduct";
import ProductDescription from "@/src/app/_components/productDetails/ProductDescription";
import ProductHeading from "@/src/app/_components/productDetails/ProductHeading";
import ProductImages from "@/src/app/_components/productDetails/ProductImages";
import ProductModels from "@/src/app/_components/productDetails/ProductModels";
import ProductSizes from "@/src/app/_components/productDetails/ProductSizes";
import SetOrder from "@/src/app/_components/productDetails/SetOrder";

function ProductData({
    product,
    variants,
    productInventories,
    productShipping = "",
    ratings,
    discount,
    likedProduct,
    lang,
}) {
    const { title, description, unitsSold } = product;

    const [selectedVariant, setSelectedVariant] = useState(variants[0]);

    const variantInventories = productInventories
        .flat()
        .filter((inventory) => inventory.variantId === selectedVariant.id);

    const [selectedInventory, setSelectedInventory] = useState(
        variantInventories[0]
    );

    useEffect(() => {
        const sameSizeInventory = variantInventories.find(
            (inventory) => inventory.size === selectedInventory.size
        );
        if (!sameSizeInventory) setSelectedInventory(variantInventories[0]);
        else setSelectedInventory(sameSizeInventory);
    }, [selectedVariant.id]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_1fr_auto] gap-4 lg:gap-8 justify-items-center pb-8 border-b-2 border-text-500">
            <ProductImages
                variants={variants}
                className="w-full max-w-lg mx-auto col-span-full lg:col-span-1"
            />
            <div className="flex flex-col gap-4">
                <ProductHeading
                    title={title[lang]}
                    unitsSold={unitsSold}
                    ratings={ratings}
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
                {productShipping && (
                    <>
                        <AboutProduct
                            productShipping={productShipping}
                            product={product}
                        />
                        <ProductDescription description={description[lang]} />
                    </>
                )}
            </div>

            <SetOrder
                selectedInventory={selectedInventory}
                selectedVariant={selectedVariant}
                product={product}
                discount={discount}
                likedProduct={likedProduct}
            />
        </div>
    );
}

export default ProductData;
