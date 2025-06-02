"use client";

import { useTranslations } from "use-intl";

function Info({ title, info }) {
    const t = useTranslations("productDetails");

    return (
        <li className="flex items-center gap-2">
            <span className="text-text-400 capitalize">{t(title)}:</span>
            <span className="font-semibold">{info}</span>
        </li>
    );
}

export default Info;
