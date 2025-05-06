"use client";

import { ChevronDown, LoaderCircle, LogOut } from "lucide-react";

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
                <DropdownMenuLabel>
                    <Link href="/account">My account</Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href="/account/payments">Payments</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/account/orders">My orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/account/wishList">Wish list</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/account/settings">Settings</Link>
                    </DropdownMenuItem>
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
                    <LoaderCircle className="animate-spin" size={20} />
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
