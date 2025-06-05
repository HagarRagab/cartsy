'use client'

import PageContainer from "@/src/app/_components/shared/PageContainer";
import NoResult from "@/src/app/_components/shared/NoResult";
import shoppingCart from "@/public/shopping-cart.png";
import PageHeader from "@/src/app/_components/shared/PageHeader";
import { useTranslations } from "next-intl";

function EmptyCart() {
    const t = useTranslations("cart");

    return (
        <PageContainer>
            <div className="mx-auto bg-bg-100 p-8 rounded-md min-h-[calc(100vh-212px)]">
                <PageHeader>
                    Cart <span>(0)</span>
                </PageHeader>
                <NoResult
                    imgSrc={shoppingCart.src}
                    alt={t("emptyCart")}
                    title={t("emptyCart")}
                    subTitle={t("addItems")}
                />
            </div>
        </PageContainer>
    );
}

export default EmptyCart;
