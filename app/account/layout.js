import ProfileLinks from "@/app/_components/account/ProfileLinks";
import ProfileUser from "@/app/_components/account/ProfileUser";
import BreadCrumb from "@/app/_components/navbar/BreadCrumb";
import PageLayout from "@/app/_components/shared/PageLayout";

function Layout({ children }) {
    return (
        <PageLayout>
            <BreadCrumb page="My account" />
            <div className="grid grid-cols-[1fr_3fr]">
                <div>
                    <ProfileUser />
                    <ProfileLinks />
                </div>
                <div>{children}</div>
            </div>
        </PageLayout>
    );
}

export default Layout;
