"use client";

import { useLocale, useTranslations } from "next-intl";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { direction } from "../../_utils/helper";

function ConfirmAction({ onConfirm, children, btnStyle, message }) {
    const t = useTranslations("general");
    const locale = useLocale();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild className={btnStyle}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent dir={direction(locale)}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {t("deleteWarningTitle")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>{message}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cancel-btn">
                        {t("cancel")}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="delete-btn"
                        onClick={onConfirm}
                    >
                        {t("confirm")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ConfirmAction;
