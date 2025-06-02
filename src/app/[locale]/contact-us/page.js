import { getTranslations } from "next-intl/server";

import PageContainer from "@/src/app/_components/shared/PageContainer";
import ContactInfo from "@/src/app/_components/contact/ContactInfo";
import SocialLinks from "@/src/app/_components/contact/SocialLinks";
import ContactForm from "@/src/app/_components/contact/ContactForm";
import PageHeader from "@/src/app/_components/shared/PageHeader";
import { contacts, contactUsInfo } from "@/src/app/_utils/utils";

async function Page({ params }) {
    const { locale } = await params;
    const t = await getTranslations("contact");

    return (
        <PageContainer>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-bg-100 px-8 py-6 rounded-lg shadow-2xl flex flex-col">
                    <PageHeader>{t("title")}</PageHeader>
                    <p>{t("question")}</p>
                    <div className="flex-1 flex items-center">
                        <ul>
                            {contacts.map((contact) => (
                                <ContactInfo
                                    key={contact.label[locale]}
                                    icon={contact.icon}
                                    label={contact.label[locale]}
                                    value={contact.value[locale]}
                                />
                            ))}
                        </ul>
                    </div>
                    <SocialLinks socialMediaLinks={contactUsInfo.socialMedia} />
                </div>
                <div className="bg-primary-200 px-8 py-6 rounded-lg shadow-2xl">
                    <ContactForm />
                </div>
            </div>
            <p className="text-center mt-10">{t("ending")}</p>
        </PageContainer>
    );
}

export default Page;
