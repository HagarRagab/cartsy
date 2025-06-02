import PageContainer from "@/src/app/_components/shared/PageContainer";
import PageHeader from "@/src/app/_components/shared/PageHeader";
import { getTranslations } from "next-intl/server";

async function Page() {
    const t = await getTranslations("aboutUs");

    return (
        <PageContainer>
            <PageHeader>{t("title")}</PageHeader>
            <div className="bg-bg-100 px-10 py-6 shadow-2xl rounded-2xl">
                <div className="mt-6 mb-4">
                    <h2 className="font-semibold text-lg mb-2">
                        {t("styleTitle")}
                    </h2>
                    <p className="ml-4">{t("styleContent")}</p>
                </div>
                <div className="mb-4">
                    <h2 className="font-semibold text-lg mb-2">
                        {t("missionTitle")}
                    </h2>
                    <p className="ml-4">{t("missionContent")}</p>
                </div>
                <div className="mb-4">
                    <h2 className="font-semibold text-lg mb-2">
                        {t("differentTitle")}
                    </h2>
                    <ul className="ml-8 flex flex-col gap-2 list-disc">
                        <li>
                            <b>{t("differentContents.first.title")}:</b>{" "}
                            {t("differentContents.first.content")}
                        </li>
                        <li>
                            <b>{t("differentContents.second.title")}:</b>{" "}
                            {t("differentContents.second.content")}
                        </li>
                        <li>
                            <b>{t("differentContents.third.title")}:</b>{" "}
                            {t("differentContents.third.content")}
                        </li>
                        <li>
                            <b>{t("differentContents.fourth.title")}:</b>{" "}
                            {t("differentContents.fourth.content")}
                        </li>
                    </ul>
                </div>
            </div>
        </PageContainer>
    );
}

export default Page;
