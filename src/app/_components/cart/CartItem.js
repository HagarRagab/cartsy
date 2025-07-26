import { isPast } from "date-fns";
import Link from "next/link";
import { getLocale } from "next-intl/server";

import CartActions from "@/src/app/_components/cart/CartActions";
import ProductOptions from "@/src/app/_components/cart/ProductOptions";
import CartItemImg from "@/src/app/_components/cart/CartItemImg";
import PriceLabel from "@/src/app/_components/shared/PriceLabel";
import ProductTitle from "@/src/app/_components/shared/ProductTitle";
import SaleLabel from "@/src/app/_components/shared/SaleLabel";

import { getDiscount } from "@/src/app/_lib/data-services/data-deals";
import {
    getProductById,
    getProductVariants,
    checkIfProductIsLiked,
    getVariantInventories,
    getInventory,
} from "@/src/app/_lib/data-services/data-product";

async function CartItem({ item, user = null }) {
    const { id: cartItemId, inventoryId, quantity: initQuantity } = item;

    const inventory = !user ? await getInventory(inventoryId) : item.inventory;

    const product = await getProductById(inventory.variant.productId);

    const variants = await getProductVariants(product.id);

    // All inventories associated to each variant
    const productInventories = await Promise.all(
        variants.map((variant) => getVariantInventories(variant.id))
    );

    const likedProduct =
        user && (await checkIfProductIsLiked(user.id, product.id));

    // Check if this product has valid discount
    const discount = await getDiscount(product.id);
    const isDiscountValid = !discount
        ? false
        : !isPast(new Date(discount?.endDate));

    const locale = await getLocale();

    return (
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-y-4">
            <div className="w-full relative transition-all grid grid-cols-[100px_1fr] xs:grid-cols-[140px_1fr] items-center gap-4 sm:gap-6 overflow-hidden">
                {isDiscountValid && <SaleLabel />}
                <CartItemImg
                    product={product}
                    image={inventory.variant.images[0]}
                    locale={locale}
                />
                <div className="flex flex-col gap-2">
                    <ProductTitle product={product} />
                    <Link
                        href={`/${locale}/products/${product.category.slug}`}
                        className="text-text-500 text-sm"
                    >
                        {product.category.name[locale]}
                    </Link>

                    <ProductOptions
                        variants={variants}
                        inventory={inventory}
                        productInventories={productInventories}
                        discount={discount}
                        isDiscountValid={isDiscountValid}
                        cartItemId={cartItemId}
                        product={product}
                    />

                    <PriceLabel
                        price={product.originalPrice}
                        discount={discount?.percentage}
                        isDiscountValid={isDiscountValid}
                    />
                </div>
            </div>
            <CartActions
                initQuantity={initQuantity}
                inventory={inventory}
                cartItemId={cartItemId}
                product={product}
                userId={user?.id}
                likedProduct={likedProduct}
            />
        </div>
    );
}

export default CartItem;
