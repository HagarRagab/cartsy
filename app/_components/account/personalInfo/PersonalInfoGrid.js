import PersonalInfoCard from "@/app/_components/account/personalInfo/PersonalInfoCard";
import {
    CalendarDays,
    CircleDollarSign,
    CircleUserRound,
    Globe,
    Mail,
    MapPinHouse,
    Smartphone,
} from "lucide-react";

function PersonalInfoGrid({ user }) {
    const infoCards = [
        {
            label: "name",
            value: user.firstName + " " + user.lastName,
            icon: <CircleUserRound />,
        },
        {
            label: "email",
            value: user.email,
            icon: <Mail />,
        },
        {
            label: "date of birth",
            value: user.dateOfBirth,
            icon: <CalendarDays />,
        },
        {
            label: "address",
            value: user.address,
            icon: <MapPinHouse />,
        },
        {
            label: "country",
            value: user.country,
            icon: <Globe />,
        },
        {
            label: "phone number",
            value: user.phoneNumber,
            icon: <Smartphone />,
        },
        {
            label: "currency",
            value: user.currency,
            icon: <CircleDollarSign />,
        },
    ];

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,_1fr))] gap-4 mt-8">
            {infoCards.map((card) => (
                <PersonalInfoCard
                    label={card.label}
                    icon={card.icon}
                    key={card.label}
                >
                    {card.value}
                </PersonalInfoCard>
            ))}
        </div>
    );
}

export default PersonalInfoGrid;
