"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/src/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { direction } from "@/src/app/_utils/helper";

function AllCategoriesMenu({ categories, locale }) {
    const t = useTranslations("general");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-base hover:underline transition-all hover:bg-transparent hover:text-text-700 p-0 cursor-pointer"
                >
                    <Menu />
                    {t("all")}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-8 w-fit">
                <DropdownMenuGroup dir={direction(locale)}>
                    {categories.map((c) => (
                        <DropdownMenuItem key={c.id}>
                            <Link href={`/${locale}/products/${c.slug}`}>
                                {c.name[locale]}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AllCategoriesMenu;
