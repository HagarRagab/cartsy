import { getLocale } from "next-intl/server";

import ProductsContainer from "@/src/app/_components/shared/ProductsContainer";
import { getSearchProducts } from "@/src/app/_lib/data-services/data-product";

async function SimilarProducts({ product }) {
    const locale = await getLocale();

    const relatedProducts = await getSearchProducts({
        searchKeyWords: product.title[locale].toLowerCase().split(" "),
        limit: 5,
        productId: product.id,
    });

    return (
        <div>
            <h2 className="w-fit font-semibold text-2xl mb-8">
                Products related to this item
            </h2>
            {relatedProducts.length > 0 && relatedProducts && (
                <ProductsContainer products={relatedProducts} />
            )}
        </div>
    );
}

export default SimilarProducts;
