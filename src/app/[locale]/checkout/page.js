import CheckoutContainer from "@/src/app/_components/checkout/CheckoutContainer";
import BreadCrumb from "@/src/app/_components/navbar/BreadCrumb";
import PageContainer from "@/src/app/_components/shared/PageContainer";
import PageHeader from "@/src/app/_components/shared/PageHeader";
import { getCart } from "@/src/app/_lib/actions";
import { getPromoCode } from "@/src/app/_lib/data-services/data-deals";
import { getUserCart } from "@/src/app/_lib/data-services/data-cart";
import { getAuthUser } from "@/src/app/_lib/data-services/data-user";

async function Page() {
    const authUser = await getAuthUser();
    const cartItems = await getCart();
    const userCart = await getUserCart(authUser.id);
    const selectedCartItems = cartItems.filter((item) => item.isSelected);

    console.log(cartItems);
    console.log(userCart);
    const promoCode =
        userCart.promoCodeId &&
        (await getPromoCode("id", userCart.promoCodeId));

    return (
        <PageContainer>
            <PageHeader>Place order</PageHeader>
            <BreadCrumb
                page="buy now"
                links={[{ name: "My cart", path: "/cart" }]}
            />

            <CheckoutContainer
                selectedCartItems={selectedCartItems}
                promoCode={promoCode}
            />
        </PageContainer>
    );
}

export default Page;
