import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function UserAvatar({ user, size = "" }) {
    return (
        <Avatar className={size}>
            <AvatarImage src={user.avatar} alt="profile" />
            <AvatarFallback className="bg-primary-200 text-text-200">
                {user.firstName[0] + user.lastName[0]}
            </AvatarFallback>
        </Avatar>
    );
}

export default UserAvatar;
