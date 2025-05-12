"use client";

import { useSearchParams } from "next/navigation";

import EmptyCart from "@/app/_components/cart/EmptyCart";
import CheckItem from "@/app/_components/shared/CheckItem";
import PageContainer from "@/app/_components/shared/PageContainer";

function CartContainer({ cart, children }) {
    const searchParams = useSearchParams();

    if (!cart.length) return <EmptyCart />;

    return (
        <PageContainer className="grid grid-cols-[3fr_1fr] gap-4">
            <div className="bg-bg-100 p-8 rounded-md">
                <header className="flex items-center justify-between">
                    <h1 className="font-semibold text-2xl">
                        Cart <span>({cart.length})</span>
                    </h1>
                    <CheckItem
                        label={
                            searchParams.get("select") === "all"
                                ? "Deselect all"
                                : "Select all"
                        }
                    />
                </header>

                {children}
            </div>

            <div className="bg-bg-100 p-8 rounded-md">
                <h2 className="font-semibold text-xl">Summary</h2>
            </div>
        </PageContainer>
    );
}

export default CartContainer;
