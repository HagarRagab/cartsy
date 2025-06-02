import HelpAccordion from "@/src/app/_components/shared/HelpAccordion";
import PageContainer from "@/src/app/_components/shared/PageContainer";
import Link from "next/link";
import PageHeader from "@/src/app/_components/shared/PageHeader";
import { getTranslations } from "next-intl/server";

async function Page({ params }) {
    const { locale } = await params;
    const t = await getTranslations("help");

    return (
        <PageContainer>
            <PageHeader>{t("title")}</PageHeader>
            <p>{t("content")}</p>

            <HelpAccordion />
            <div className="text-center">
                <p className="font-semibold text-lg text-center">
                    {t("stillNeedHelp")}
                </p>
                <Link
                    href={`/${locale}/contact-us`}
                    className="text-accent-200 hover:underline"
                >
                    {t("visitContactUs")}
                </Link>
            </div>
        </PageContainer>
    );
}

export default Page;
