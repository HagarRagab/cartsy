import ProductCard from "@/app/_components/shared/ProductCard";

function ProductsContainer({ products, filteredrating }) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,230px))] justify-center gap-x-4 gap-y-8 pb-8 mx-auto">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    containerStyle="max-w-70"
                    filteredrating={filteredrating}
                />
            ))}
        </div>
    );
}

export default ProductsContainer;
