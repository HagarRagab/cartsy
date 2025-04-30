"use client";

import { ChevronDown, LogOut } from "lucide-react";

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
import UserAvatar from "@/app/_components/shared/UserAvatar";
import SubmitBtn from "../auth/SubmitBtn";
import Link from "next/link";

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
                        <SubmitBtn
                            btnClass="accent-btn"
                            loadingLabel="Loggin out..."
                        >
                            <LogOut size={20} className="text-accent-200" />
                            Log out
                        </SubmitBtn>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ProfileAvatar;
