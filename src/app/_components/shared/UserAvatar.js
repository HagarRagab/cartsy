import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/src/components/ui/avatar";

function UserAvatar({ user, className = "" }) {
    return (
        <Avatar className={`${className}`}>
            <AvatarImage src={user.avatar} alt="profile" />
            <AvatarFallback className="bg-primary-200 text-text-200">
                {user.firstName[0] + user.lastName[0]}
            </AvatarFallback>
        </Avatar>
    );
}

export default UserAvatar;
