"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { useTranslations } from "use-intl";

function RateOrderMsg() {
    const [isHidden, setIsHidden] = useState(false);
    const t = useTranslations("myOrders");

    if (isHidden) return;

    return (
        <div className="bg-yellow-100 border-2 border-yellow-200 rounded-md flex items-center gap-2 px-4 py-1">
            <Star size={20} className="fill-yellow-400 stroke-yellow-400" />
            <p className="flex-1">{t("rateMsg")}</p>
            <Button className="ghost-btn" onClick={() => setIsHidden(true)}>
                <X />
            </Button>
        </div>
    );
}

export default RateOrderMsg;
