"use client";

import { useAuth } from "@/src/app/_context/AuthContext";
import UserAvatar from "@/src/app/_components/shared/UserAvatar";

function ProfileUser() {
    const { user } = useAuth();

    return (
        <div className="mb-8 flex sm:flex-col items-center sm:items-start gap-2">
            <UserAvatar user={user} className=" size-15 sm:size-20 text-xl" />
            <div>
                <p className="font-semibold text-sm sm:text-lg">{`${user.firstName} ${user.lastName}`}</p>
                <p className="text-text-300 text-xs sm:text-sm">
                    @{user.userName}
                </p>
            </div>
        </div>
    );
}

export default ProfileUser;
