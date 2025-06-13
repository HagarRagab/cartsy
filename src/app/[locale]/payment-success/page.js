import { getTranslations } from "next-intl/server";
import { add } from "date-fns";

import FormattedPrice from "@/src/app/_components/shared/FormattedPrice";
import PageContainer from "@/src/app/_components/shared/PageContainer";
import ResultPage from "@/src/app/_components/shared/ResultPage";
import { createOrderAction, getCart } from "@/src/app/_lib/actions";
import { getUserCart } from "@/src/app/_lib/data-services/data-cart";
import { getAuthUser, getUser } from "@/src/app/_lib/data-services/data-user";
import { stripe } from "@/src/app/_lib/stripe";
import { PREFIX_LENGTH } from "@/src/app/_utils/constants";
import { generateOrderNumber } from "@/src/app/_utils/helper";

async function Page({ searchParams }) {
    const { payment_intent, itemsPrice, discountAmount, shippingCost } =
        await searchParams;

    const authUser = await getAuthUser();
    if (!authUser) return;
    const user = authUser && (await getUser("id", authUser.id))[0];

    const userCart = await getUserCart(user.id);
    const cartItems = await getCart();
    const selectedCartItems = cartItems.filter((item) => item.isSelected);

    const intent = await stripe.paymentIntents.retrieve(payment_intent);
    const paymentMethod = await stripe.paymentMethods.retrieve(
        intent.payment_method
    );

    const t = await getTranslations("paymentSuccess");

    // Create order
    const order = {
        userId: user.id,
        shippingAddress: user.address,
        receiverName: user.firstName + " " + user.lastName,
        receiverPhoneNumber: user.phoneNumber,
        subTotalAmount: itemsPrice,
        chargeAmount: intent.amount_received / 100,
        promoCodeId: userCart.promoCodeId,
        transactionId: intent.id,
        items: selectedCartItems.map((selectedItem) => ({
            inventoryId: selectedItem.inventoryId,
            price: selectedItem.inventory.price,
            quantity: selectedItem.quantity,
        })),
        deliveryEstimate: `${add(new Date(), { days: 14 }).toISOString()}`,
        currency: intent.currency.toUpperCase(),
        orderNumber: generateOrderNumber(PREFIX_LENGTH),
        shippingCost,
        discountAmount,
        paymentMethod: paymentMethod.type,
        lastFourCardNumbers: paymentMethod.card?.last4,
        paymentStatus: intent.status,
    };

    if (intent.status === "succeeded") {
        const result = await createOrderAction(selectedCartItems, order);
        console.log(result.message);
    }

    return (
        <PageContainer className="flex items-center justify-center min-h-[calc(100vh-136px)]">
            <ResultPage
                imgSrc="/success.png"
                alt={t("title")}
                title={t("title")}
                subTitle={t("subTitle")}
            >
                <div className="grid grid-cols-2 bg-bg-100 p-4 rounded-md border-2 border-bg-300">
                    <p>{t("amountPaid")}</p>
                    <p className="font-semibold">
                        <FormattedPrice
                            value={intent.amount_received / 100}
                            currency={intent.currency}
                        />
                    </p>
                    <p>{t("transactionId")}</p>
                    <p className="font-semibold">{intent.id}</p>
                </div>
            </ResultPage>
        </PageContainer>
    );
}

export default Page;
