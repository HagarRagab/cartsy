"use client";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

function Location({ user }) {
    const address = `${user.city}, ${user.country}`;
    const t = useTranslations("header");

    return (
        <div className="text-xs sm:text-base ml-auto sm:ml-0 col-span-2 sm:col-span-1 col-start-2 sm:col-start-2">
            <div className="flex items-center gap-1 text-text-400">
                <MapPin size={20} />
                <span className="capitalize">{t("locationTitle")}</span>
            </div>
            <p>{address}</p>
        </div>
    );
}

export default Location;
