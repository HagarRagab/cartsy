"use client";

import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

import SpinnerIcon from "@/src/app/_components/shared/SpinnerIcon";
import UserAvatar from "@/src/app/_components/shared/UserAvatar";
import { profileList } from "@/src/app/_utils/utils";
import { signOut } from "@/src/app/_auth/actions";
import { Button } from "@/src/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

function ProfileAvatar({ user, locale }) {
    const t = useTranslations("account");

    return (
        <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
            <DropdownMenuTrigger asChild>
                <Button className="bg-transparent border-0 hover:bg-transparent cursor-pointer p-0">
                    <div className="flex items-center gap-1">
                        <UserAvatar user={user} />
                        <ChevronDown />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44 mb-4 sm:mb-0">
                <DropdownMenuLabel>
                    {t("welcome")}, {user.firstName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {profileList.map((item) => (
                        <DropdownMenuItem key={item.label[locale]}>
                            <Link
                                href={`/${locale}${item.href}`}
                                className="flex items-center gap-2"
                            >
                                {item.icon}
                                {item.label[locale]}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <form action={signOut}>
                        <LogoutBtn
                            label={t("logOut")}
                            loadingLabel={t("logOutLoading")}
                        />
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function LogoutBtn({ label, loadingLabel }) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full accent-btn" disabled={pending}>
            {pending ? (
                <>
                    <SpinnerIcon />
                    {loadingLabel}
                </>
            ) : (
                <>
                    <LogOut size={20} />
                    {label}
                </>
            )}
        </Button>
    );
}

export default ProfileAvatar;
