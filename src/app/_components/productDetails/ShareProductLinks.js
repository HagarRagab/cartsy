"use client";

import { useLocale, useTranslations } from "next-intl";
import {
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "next-share";
import { useEffect, useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { direction } from "@/src/app/_utils/helper";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

function ShareProductLinks({ children, product }) {
    const t = useTranslations("productDetails");
    const locale = useLocale();

    const [fullUrl, setFullUrl] = useState("");

    useEffect(() => {
        setFullUrl(window.location.href);
    }, []);

    async function copyLink() {
        await navigator.clipboard.writeText(fullUrl);
        toast.success(t("copyNotification"));
    }

    return (
        <DropdownMenu dir={direction(locale)}>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit max-w-80 p-4" align="start">
                <DropdownMenuLabel className="font-semibold text-base">
                    {t("share")}:
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>{t("shareVia")}:</DropdownMenuLabel>

                <DropdownMenuGroup className="flex items-center gap-2">
                    <DropdownMenuItem>
                        <FacebookShareButton
                            url={`${fullUrl}`}
                            quote={product.description[locale]}
                        >
                            <FacebookIcon size={40} round />
                        </FacebookShareButton>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <WhatsappShareButton
                            url={`${fullUrl}`}
                            quote={product.description[locale]}
                        >
                            <WhatsappIcon size={40} round />
                        </WhatsappShareButton>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <TelegramShareButton
                            url={`${fullUrl}`}
                            quote={product.description[locale]}
                        >
                            <TelegramIcon size={40} round />
                        </TelegramShareButton>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuLabel>{t("orCopyLink")}:</DropdownMenuLabel>

                <DropdownMenuGroup className="flex items-center gap-1">
                    <Link2 className="-rotate-45" />
                    <Input value={fullUrl} readOnly />
                    <Button className="primary-btn" onClick={copyLink}>
                        {t("copyBtn")}
                    </Button>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ShareProductLinks;
