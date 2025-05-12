import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

function BreadCrumb({ page, links }) {
    return (
        <Breadcrumb className="mb-8">
            <BreadcrumbList className="text-md">
                <BreadcrumbItem className="text-accent-200">
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {links &&
                    links.length > 0 &&
                    links.map((link) => (
                        <Fragment key={link.name}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="text-accent-200">
                                <BreadcrumbLink href={`/products/${link.slug}`}>
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
