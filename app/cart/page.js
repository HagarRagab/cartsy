import PageLayout from "@/app/_components/shared/PageLayout";
import CheckItem from "@/app/_components/shared/CheckItem";
import CartItemsContainer from "@/app/_components/cart/CartItemsContainer";
import {
    getAuthUser,
    getCartItems,
    getUser,
    getUserCart,
} from "@/app//_lib/data-service";

async function Page() {
    const authUser = await getAuthUser();
    const user = authUser && (await getUser("email", authUser.email))[0];
    const cart = await getUserCart(user.id);
    const cartItems = await getCartItems(cart.id);
    console.log(cartItems);

    return (
        <PageLayout className="grid grid-cols-[3fr_1fr] gap-4">
            <div className="bg-bg-100 p-8 rounded-md">
                <header className="flex items-center justify-between">
                    <h1 className="font-semibold text-2xl">
                        Cart <span>({cartItems.length})</span>
                    </h1>
                    <CheckItem label="Select all" />
                </header>
                <CartItemsContainer />
            </div>
            <div className="bg-bg-100 p-8 rounded-md">
                <h2 className="font-semibold text-xl">Summary</h2>
            </div>
        </PageLayout>
    );
}

export default Page;
