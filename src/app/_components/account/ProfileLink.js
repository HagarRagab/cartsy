"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function ProfileLink({ link, locale }) {
    const pathname = usePathname();
    const pathnameWithoutLocale = `/${pathname.split("/").slice(2).join("/")}`;

    return (
        <li
            className={`${
                pathnameWithoutLocale === link.href
                    ? "text-accent-200 font-semibold text-lg"
                    : "text-text-300 hover:text-text-200"
            } mb-1 transition-all text-base sm:text-lg`}
        >
            <Link href={`/${locale}${link.href}`}>{link.label[locale]}</Link>
        </li>
    );
}

export default ProfileLink;
