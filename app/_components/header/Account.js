"use client";

import { User } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/app/_context/AuthContext";
import ProfileAvatar from "@/app/_components/header/ProfileAvatar";

function Account() {
    const { user } = useAuth();

    return (
        <>
            {!user ? (
                <Link href="/auth/login" className="flex items-center gap-2">
                    <User size={25} />
                    <div className="flex flex-col text-sm">
                        <span className="text-text-500">Welcome</span>
                        <span className="font-semibold">Log in / Register</span>
                    </div>
                </Link>
            ) : (
                <ProfileAvatar user={user} />
            )}
        </>
    );
}

export default Account;
