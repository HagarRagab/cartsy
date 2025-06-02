import { getCart } from "@/src/app/_lib/actions";
import { getAuthUser, getUser } from "@/src/app/_lib/data-services/data-user";
import PageContainer from "@/src/app/_components/shared/PageContainer";
import PageHeader from "@/src/app/_components/shared/PageHeader";
import BreadCrumb from "@/src/app/_components/navbar/BreadCrumb";
import Checkout from "@/src/app/_components/checkout/Checkout";
import PurchaseInfoCard from "@/src/app/_components/checkout/PurchaseInfoCard";

async function Page() {
    const cartItems = await getCart();
    const selectedCartItems = cartItems.filter((item) => item.isSelected);

    const authUser = await getAuthUser();
    const user = authUser && (await getUser("email", authUser.email))[0];

    return (
        <PageContainer>
            <PageHeader>Place order</PageHeader>
            <BreadCrumb
                page="buy now"
                links={[{ name: "My cart", path: "/cart" }]}
            />

            <div className="flex flex-col md:grid grid-cols-[4fr_2fr] gap-4">
                <div className="bg-bg-100 p-2 sm:p-8 rounded-md col-span-full lg:col-span-1 row-span-full">
                    <PurchaseInfoCard user={user} />
                </div>

                <Checkout selectedCartItems={selectedCartItems} />
            </div>
        </PageContainer>
    );
}

export default Page;
