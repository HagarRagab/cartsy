import ProfileLink from "@/app/_components/account/ProfileLink";

const links = [
    {
        href: "/account",
        label: "Personal information",
    },
    {
        href: "/account/payments",
        label: "Payments",
    },
    {
        href: "/account/orders",
        label: "Order history",
    },
    {
        href: "/account/wishList",
        label: "Wish list",
    },
    {
        href: "/account/settings",
        label: "Settings",
    },
];

function ProfileLinks() {
    return (
        <ul>
            {links.map((link) => (
                <ProfileLink key={link.label} link={link} />
            ))}
        </ul>
    );
}

export default ProfileLinks;
