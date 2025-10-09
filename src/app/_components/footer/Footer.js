import { getLocale, getTranslations } from "next-intl/server";

import LinksGroup from "@/src/app/_components/shared/LinksGroup";
import { paymentMethodsList } from "@/src/app/_utils/utils";

async function Footer() {
    const t = await getTranslations("footer");
    const locale = await getLocale();

    return (
        <footer className="bg-bg-800 text-text-700 px-12 py-8">
            <div className="flex flex-wrap text-center justify-around gap-6 mb-12">
                <LinksGroup
                    title={{ en: "Get to know us", ar: "تعرف علينا" }}
                    list={[
                        {
                            label: { en: "About Cartcy", ar: "حول كارتسي" },
                            path: `/${locale}/about-us`,
                        },
                    ]}
                />
                <LinksGroup
                    title={{ en: "Let us help you", ar: "دعنا نساعدك" }}
                    list={[
                        {
                            label: { en: "Help", ar: "مساعدة" },
                            path: `/${locale}/help`,
                        },
                        {
                            label: { en: "Contact us", ar: "اتصل بنا" },
                            path: `/${locale}/contact-us`,
                        },
                    ]}
                />
                <LinksGroup
                    title={{ en: "Pay with", ar: "ادفع مع" }}
                    list={paymentMethodsList}
                    isImg={true}
                />
            </div>
            <p className="text-center" dir="ltr">
                &copy;2023&mdash;2025, Hagar Ragab | All Rights Reserved
            </p>
        </footer>
    );
}

export default Footer;
