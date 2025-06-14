import ProfileLink from "@/src/app/_components/account/ProfileLink";
import { profileList } from "@/src/app/_utils/utils";
import { getLocale } from "next-intl/server";

async function ProfileLinks() {
    const locale = await getLocale();

    return (
        <ul className="flex flex-row sm:flex-col justify-between">
            {profileList.map((link) => (
                <ProfileLink
                    key={link.label[locale]}
                    link={link}
                    locale={locale}
                />
            ))}
        </ul>
    );
}

export default ProfileLinks;
