import PageContainer from "@/app/_components/shared/PageContainer";
import NoResult from "@/app/_components/shared/NoResult";
import shoppingCart from "@/public/shopping-cart.png";

function EmptyCart() {
    return (
        <PageContainer>
            <div className="mx-auto bg-bg-100 p-8 rounded-md min-h-[calc(100vh-212px)]">
                <h1 className="font-semibold text-2xl">
                    Cart <span>(0)</span>
                </h1>
                <NoResult
                    imgSrc={shoppingCart.src}
                    alt="shopping cart"
                    title="Empty cart"
                    subTitle="Start adding items to your cart"
                />
            </div>
        </PageContainer>
    );
}

export default EmptyCart;
