import { getTranslations } from "next-intl/server";

import ProfileLinks from "@/src/app/_components/account/ProfileLinks";
import ProfileUser from "@/src/app/_components/account/ProfileUser";
import BreadCrumb from "@/src/app/_components/navbar/BreadCrumb";
import PageContainer from "@/src/app/_components/shared/PageContainer";

async function Layout({ children }) {
    const t = await getTranslations("myAccount");

    return (
        <PageContainer className="px-4">
            <BreadCrumb page={t("title")} />
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4">
                <div>
                    <ProfileUser />
                    <ProfileLinks />
                </div>
                <div>{children}</div>
            </div>
        </PageContainer>
    );
}

export default Layout;
