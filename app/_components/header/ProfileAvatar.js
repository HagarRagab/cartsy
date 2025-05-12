"use client";

import {
    ChevronDown,
    CreditCard,
    Heart,
    LogOut,
    Settings,
    ShoppingBag,
    UserRound,
} from "lucide-react";

import UserAvatar from "@/app/_components/shared/UserAvatar";
import { signOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import SpinnerIcon from "@/app/_components/shared/SpinnerIcon";

const profileList = [
    {
        label: "My account",
        icon: <UserRound size={15} />,
        href: "/account",
    },
    {
        label: "Payments",
        icon: <CreditCard size={15} />,
        href: "/account/payments",
    },
    {
        label: "My orders",
        icon: <ShoppingBag size={15} />,
        href: "/account/orders",
    },
    {
        label: "My wishlist",
        icon: <Heart size={15} />,
        href: "/account/wishlist",
    },
    {
        label: "Settings",
        icon: <Settings size={15} />,
        href: "/account/settings",
    },
];

function ProfileAvatar({ user }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-transparent border-0 hover:bg-transparent cursor-pointer">
                    <div className="flex items-center gap-1">
                        <UserAvatar user={user} />
                        <ChevronDown />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
                <DropdownMenuLabel>Welcome, {user.firstName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {profileList.map((item) => (
                        <DropdownMenuItem key={item.label}>
                            <Link
                                href={item.href}
                                className="flex items-center gap-2"
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <form action={signOut}>
                        <LogoutBtn
                            label="Log out"
                            loadingLabel="Logging out..."
                        />
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function LogoutBtn({ label, loadingLabel }) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full accent-btn" disabled={pending}>
            {pending ? (
                <>
                    <SpinnerIcon />
                    {loadingLabel}
                </>
            ) : (
                <>
                    <LogOut size={20} />
                    {label}
                </>
            )}
        </Button>
    );
}

export default ProfileAvatar;
