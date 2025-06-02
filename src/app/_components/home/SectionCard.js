import { getTranslations } from "next-intl/server";
import Link from "next/link";

async function SectionCard({
    children,
    sectionTitleKey,
    showMoreBtn = false,
    className = "",
    href,
    ...props
}) {
    const t = await getTranslations("sectionCard");

    return (
        <div
            className={`bg-bg-100 rounded-lg p-4 md:p-6 ${className} shadow-lg`}
            {...props}
        >
            {sectionTitleKey && (
                <header className="flex items-center justify-between mx-2 md:mx-10 mb-4">
                    <h2 className="font-bold capitalize md:text-xl">
                        {t(`titles.${sectionTitleKey}`)}
                    </h2>
                    {showMoreBtn && (
                        <Link
                            href={href}
                            className="text-accent-200 font-semibold hover:underline hover:decoration-solid cursor-pointer"
                        >
                            {t("showMore")}
                        </Link>
                    )}
                </header>
            )}
            {children}
        </div>
    );
}

export default SectionCard;
