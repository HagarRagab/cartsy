"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function ProfileLink({ link }) {
    const pathname = usePathname();

    return (
        <li
            className={`${
                pathname === link.href
                    ? "text-accent-200 font-semibold text-lg"
                    : "text-text-300 hover:text-text-200"
            } mb-1 transition-all`}
        >
            <Link href={link.href}>{link.label}</Link>
        </li>
    );
}

export default ProfileLink;
