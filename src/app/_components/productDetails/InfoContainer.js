"use client";

import { useTranslations } from "next-intl";

function InfoContainer({ titleKey, titleValue, children }) {
    const t = useTranslations("productDetails");

    return (
        <div>
            <h2 className="mb-2 font-semibold">
                {t(titleKey)}: <span>{titleValue}</span>
            </h2>
            {children}
        </div>
    );
}

export default InfoContainer;
