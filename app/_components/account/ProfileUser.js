"use client";

import { useAuth } from "@/app/_context/AuthContext";
import UserAvatar from "@/app/_components/shared/UserAvatar";

function ProfileUser() {
    const { user } = useAuth();

    return (
        <div className="mb-8">
            <UserAvatar user={user} size="size-20 text-xl mb-4" />
            <p className="font-semibold text-lg">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-text-300 text-sm">@{user.userName}</p>
        </div>
    );
}

export default ProfileUser;
