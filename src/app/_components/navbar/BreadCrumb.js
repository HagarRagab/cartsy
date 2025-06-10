import { getLocale, getTranslations } from "next-intl/server";
import { Fragment } from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";

async function BreadCrumb({ page, links }) {
    const locale = await getLocale();
    const t = await getTranslations("general");

    return (
        <Breadcrumb className="mb-8">
            <BreadcrumbList className="text-base">
                <BreadcrumbItem className="text-accent-200">
                    <BreadcrumbLink href="/">{t("home")}</BreadcrumbLink>
                </BreadcrumbItem>
                {links &&
                    links.length > 0 &&
                    links.map((link) => (
                        <Fragment key={link.name}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="text-accent-200">
                                <BreadcrumbLink
                                    href={`/${locale}/${link.path}`}
                                >
                                    {link.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </Fragment>
                    ))}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="max-w-70 whitespace-nowrap overflow-hidden overflow-ellipsis capitalize">
                        {page}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default BreadCrumb;
