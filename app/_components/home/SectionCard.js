import Link from "next/link";

function SectionCard({
    children,
    sectionTitle,
    showMoreBtn = false,
    className = "",
    href,
}) {
    return (
        <div className={`bg-bg-100 rounded-lg p-6 ${className} shadow-lg`}>
            {sectionTitle && (
                <header className="flex items-center justify-between mx-10 mb-4">
                    <h2 className="font-bold capitalize text-xl">
                        {sectionTitle}
                    </h2>
                    {showMoreBtn && (
                        <Link
                            href={href}
                            className="text-accent-200 font-semibold hover:underline hover:decoration-solid cursor-pointer"
                        >
                            Show More
                        </Link>
                    )}
                </header>
            )}
            {children}
        </div>
    );
}

export default SectionCard;
