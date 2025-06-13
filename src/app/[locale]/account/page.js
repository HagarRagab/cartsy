"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { useAuth } from "@/src/app/_context/AuthContext";
import { Button } from "@/src/components/ui/button";
import PersonalInfoGrid from "@/src/app/_components/account/personalInfo/PersonalInfoGrid";
import PersonalInfoEditForm from "@/src/app/_components/account/personalInfo/PersonalInfoEditForm";

function Page() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    const t = useTranslations("personalInfo");

    return (
        <div>
            <h1 className="text-lg sm:text-2xl font-semibold mb-3">
                {t("title")}
            </h1>
            <p className="text-text-300 text-xs sm:text-sm">{t("subTitle")}</p>
            <PersonalInfoGrid user={user} />
            <div className="w-full text-right">
                <Button
                    className={`mt-8 w-20 ${
                        isEditing ? "cancel-btn" : "primary-btn"
                    }`}
                    onClick={() => setIsEditing((editing) => !editing)}
                >
                    {isEditing ? t("cancel") : t("edit")}
                </Button>
            </div>
            {isEditing && <PersonalInfoEditForm user={user} path="/account" />}
        </div>
    );
}

export default Page;
