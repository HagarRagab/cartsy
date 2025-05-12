import { isPast } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import CartActions from "@/app/_components/cart/CartActions";
import ProductOptions from "@/app/_components/cart/ProductOptions";

import PriceLabel from "@/app/_components/shared/PriceLabel";
import SaleLabel from "@/app/_components/shared/SaleLabel";
import ProductTitle from "@/app/_components/shared/ProductTitle";
import {
    getDiscount,
    getInventory,
    getProductById,
    getProductVariants,
} from "@/app/_lib/data-service";
import { Checkbox } from "@/components/ui/checkbox";

async function CartItem({ item, inventories }) {
    const { id: cookieItemId, inventoryId, quantity: initQuantity } = item;

    const inventory = await getInventory(inventoryId);

    const product = await getProductById(inventory.variant.productId);

    const variants = await getProductVariants(product.id);

    // Check if this product has valid discount
    const discount = await getDiscount(product.id);
    const isDiscountValid = !discount
        ? false
        : !isPast(new Date(discount?.endDate));

    const productLink = `/products/${product.category.slug}/${product.id}`;

    const lang = "en";

    return (
        <div key={item.id} className="flex items-center gap-4 my-6">
            <Checkbox />
            <label className="flex-1 w-full grid grid-cols-[auto_1fr_auto] items-center">
                <div className="w-full relative group transition-all grid grid-cols-[150px_1fr] items-center gap-6 overflow-hidden">
                    {isDiscountValid && <SaleLabel />}
                    <Link
                        href={productLink}
                        className="relative w-full aspect-square bg-bg-100 border border-bg-200 rounded-md overflow-hidden shadow-sm"
                    >
                        <Image
                            fill
                            src={inventory.variant.images[0]}
                            alt={product.title[lang]}
                            className="object-contain p-2 bg-bg-100 group-hover:scale-90 transition-all"
                        />
                    </Link>
                    <div className="flex flex-col gap-2">
                        <ProductTitle
                            productLink={productLink}
                            title={product.title[lang]}
                        />
                        <Link
                            href={`/products/${product.category.slug}`}
                            className="text-text-500 text-sm"
                        >
                            {product.category.name}
                        </Link>

                        <ProductOptions
                            variants={variants}
                            inventories={inventories}
                            inventory={inventory}
                            discount={discount}
                            isDiscountValid={isDiscountValid}
                            product={product}
                            cookieItemId={cookieItemId}
                        />

                        <p className="text-accent-200 text-md font-semibold mt-2">
                            <PriceLabel
                                price={product.originalPrice}
                                discount={discount?.percentage}
                                isDiscountValid={isDiscountValid}
                                productCurrency={product.currency}
                                userCurrency="EGP"
                            />
                        </p>
                    </div>
                </div>
                <CartActions
                    initQuantity={initQuantity}
                    inventory={inventory}
                    cookieItemId={cookieItemId}
                />
            </label>
        </div>
    );
}

export default CartItem;
