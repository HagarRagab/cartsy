"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";

import EmptyCart from "@/src/app/_components/cart/EmptyCart";
import CartSummary from "@/src/app/_components/cart/CartSummary";
import LinksGroup from "@/src/app/_components/shared/LinksGroup";
import PageHeader from "@/src/app/_components/shared/PageHeader";
import PageContainer from "@/src/app/_components/shared/PageContainer";
import { selectionItemAction } from "@/src/app/_lib/actions";
import { paymentMethodsList } from "@/src/app/_utils/utils";
import { Checkbox } from "@/src/components/ui/checkbox";
import { useCart } from "../../_context/CartContext";

function CartContainer({ cart, promoCode, children }) {
    const t = useTranslations("cart");
    const { optimisticSelectAll, setOptimisticSelectAll } = useCart();
    const selectedCartItems = cart?.filter((item) => item.isSelected === true);

    // The "real" all-selected state based on server data
    const allSelected = selectedCartItems.length === cart.length;
    // Use the optimistic value while a transition is in flight, otherwise fall back to server state
    const displaySelectAll = optimisticSelectAll !== null ? optimisticSelectAll : allSelected;

    const [, startTransition] = useTransition();

    if (!cart.length) return <EmptyCart />;

    async function handleSelectAll() {
        const nextSelected = !displaySelectAll;
        setOptimisticSelectAll(nextSelected);
        startTransition(async () => {
            try {
                await Promise.all(
                    cart.map((item) =>
                        selectionItemAction(item.id, {
                            isSelected: nextSelected,
                        })
                    )
                );
            } catch (error) {
                console.error(error);
            } finally {
                setOptimisticSelectAll(null);
            }
        });
    }

    return (
        <PageContainer className="flex flex-col md:grid grid-cols-[4fr_2fr] grid-rows-[auto_auto] gap-4">
            <div className="bg-bg-100 p-2 sm:p-8 rounded-md col-span-full lg:col-span-1 row-span-full">
                <header className="flex items-center justify-between">
                    <PageHeader>
                        {t("title")} <span>({selectedCartItems?.length})</span>
                    </PageHeader>
                    <div className="flex items-center space-x-2 mb-6">
                        <label
                            htmlFor="select"
                            className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {displaySelectAll
                                ? t("deselectAll")
                                : t("selectAll")}
                        </label>
                        <Checkbox
                            id="select"
                            checked={displaySelectAll}
                            onCheckedChange={handleSelectAll}
                        />
                    </div>
                </header>

                <div className="mt-8">{children}</div>
            </div>

            {<CartSummary
                    selectedCartItems={selectedCartItems}
                    promoCode={promoCode}
                    optimisticSelectAll={displaySelectAll}
                />}

            <div className="bg-bg-100 p-8 rounded-md col-start-2 h-fit">
                <LinksGroup
                    title={{ en: "Pay with", ar: "ادفع ب" }}
                    list={paymentMethodsList}
                    isImg={true}
                />
            </div>
        </PageContainer>
    );
}

export default CartContainer;
