"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "../../_context/CartContext";

function ResultPage({ imgSrc, alt, title, subTitle, children }) {
    const t = useTranslations("general");
    const { setOrderSummary } = useCart();

    useEffect(() => {
        setOrderSummary({
            itemsPrice: 0,
            discountAmount: 0,
            itemsPriceAfterDiscount: 0,
            shippingCost: 0,
            chargeAmount: 0,
            totalCartItems: 0,
        });
    }, []);

    return (
        <div className="flex flex-col gap-2 items-center justify-center min-h-[calc(100vh-212px)]">
            <div className="relative w-50 aspect-square mb-6">
                <Image src={imgSrc} alt={alt} fill className="object-contain" />
            </div>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p>{subTitle}</p>

            {children && children}

            <Link href="/" className="primary-btn px-6 py-2 rounded-md mt-6">
                {t("exploreBtn")}
            </Link>
        </div>
    );
}

export default ResultPage;
