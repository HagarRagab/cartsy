"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

function LinksGroup({ title, list, isImg = false }) {
    const locale = useLocale();

    return (
        <div>
            <h2 className="font-semibold text-base mb-2">{title[locale]}</h2>
            <ul className={`${isImg ? "flex items-center gap-2" : ""}`}>
                {list.map((link) => (
                    <li key={link.label[locale] || link.label}>
                        {!isImg && (
                            <Link
                                href={link.path}
                                className="text-sm hover:underline transition-all mb-1"
                            >
                                {link.label[locale] || link.label}
                            </Link>
                        )}
                        {isImg && (
                            <Image
                                width={36}
                                height={24}
                                src={link.src}
                                alt={link.label[locale] || link.label}
                                className="w-9 h-6"
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LinksGroup;
