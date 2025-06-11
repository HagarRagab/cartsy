import { getTranslations } from "next-intl/server";

import PageContainer from "@/src/app/_components/shared/PageContainer";
import ResultPage from "@/src/app/_components/shared/ResultPage";
import FormattedPrice from "@/src/app/_components/shared/FormattedPrice";
import { getAuthUser, getUser } from "@/src/app/_lib/data-services/data-user";
import { getCart, resetCartAction } from "@/src/app/_lib/actions";
import { createOrder } from "@/src/app/_lib/data-services/data-orders";
import { updateStock } from "@/src/app/_lib/data-services/data-product";
import { stripe } from "@/src/app/_lib/stripe";
import { getUserCart } from "@/src/app/_lib/data-services/data-cart";
import { generateOrderNumber } from "@/src/app/_utils/helper";
import { PREFIX_LENGTH } from "@/src/app/_utils/constants";
import { getPromoCode } from "@/src/app/_lib/data-services/data-deals";

async function Page({ searchParams }) {
    const { payment_intent } = await searchParams;

    const authUser = await getAuthUser();
    if (!authUser) return;
    const user = authUser && (await getUser("id", authUser.id))[0];

    const userCart = await getUserCart(user.id);
    const cartItems = await getCart();
    const selectedCartItems = cartItems.filter((item) => item.isSelected);
    const promoCode =
        userCart.promoCodeId &&
        (await getPromoCode("id", userCart.promoCodeId));

    const intent = await stripe.paymentIntents.retrieve(payment_intent);
    const paymentMethod = await stripe.paymentMethods.retrieve(
        intent.payment_method
    );

    const t = await getTranslations("paymentSuccess");

    // Create order
    const order = {
        userId: user.id,
        shippingAddress: user.address,
        // subTotalAmount: ,
        chargeAmount: intent.amount_received / 100,
        promoCodeId: userCart.promoCodeId,
        transactionId: intent.id,
        // trackingId: ,
        items: selectedCartItems.map((selectedItem) => ({
            inventoryId: selectedItem.inventoryId,
            price: selectedItem.inventory.price,
            quantity: selectedItem.quantity,
        })),
        // deliveryEstimate: ,
        currency: intent.currency.toUpperCase(),
        orderNumber: generateOrderNumber(PREFIX_LENGTH),
        // shippingCost: ,
        // discountAmount: ,
        paymentMethod: paymentMethod.type,
        lastFourCardNumbers: paymentMethod.card?.last4,
        paymentStatus: intent.status,
    };
    // await createOrder(order);

    // Update stock for all items
    // await Promise.all(
    //     selectedCartItems.map((item) =>
    //         updateStock(item.inventoryId, item.inventory.stock - item.quantity)
    //     )
    // );

    // Delete appliedPromo from localStorage

    // Reset cart
    // await resetCartAction();

    return (
        <PageContainer className="flex items-center justify-center min-h-[calc(100vh-136px)]">
            <ResultPage
                imgSrc="/success.png"
                alt={t("title")}
                title={t("title")}
                subTitle={t("subTitle")}
            >
                <div className="grid grid-cols-2 bg-bg-100 p-4 rounded-md border-2 border-bg-300">
                    <p>Amount paid</p>
                    <p className="font-semibold">
                        <FormattedPrice
                            value={intent.amount_received / 100}
                            currency={intent.currency}
                        />
                    </p>
                    <p>Transaction ID</p>
                    <p className="font-semibold">{intent.id}</p>
                </div>
            </ResultPage>
        </PageContainer>
    );
}

export default Page;
