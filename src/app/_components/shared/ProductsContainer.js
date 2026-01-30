import ProductCard from "@/src/app/_components/shared/ProductCard";

function ProductsContainer({ products }) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,220px))] gap-x-3 gap-y-8 pb-8 mx-auto">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    containerStyle="max-w-60"
                    innerContainerStyle="mx-auto"
                />
            ))}
        </div>
    );
}

export default ProductsContainer;
