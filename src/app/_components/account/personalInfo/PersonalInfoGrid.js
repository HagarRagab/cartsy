"use client";

import {
    CalendarDays,
    CircleDollarSign,
    CircleUserRound,
    Globe,
    Mail,
    MapPinHouse,
    Smartphone,
} from "lucide-react";
import { useLocale } from "next-intl";

import PersonalInfoCard from "@/src/app/_components/account/personalInfo/PersonalInfoCard";

function PersonalInfoGrid({ user }) {
    const infoCards = [
        {
            label: { en: "name", ar: "الاسم" },
            value: user.firstName + " " + user.lastName,
            icon: <CircleUserRound />,
        },
        {
            label: { en: "email", ar: "البريد الإلكتروني" },
            value: user.email,
            icon: <Mail />,
        },
        {
            label: { en: "date of birth", ar: "تاريخ الميلاد" },
            value: user.dateOfBirth,
            icon: <CalendarDays />,
        },
        {
            label: { en: "address", ar: "العنوان" },
            value: user.address,
            icon: <MapPinHouse />,
        },
        {
            label: { en: "country", ar: "الدولة" },
            value: user.country,
            icon: <Globe />,
        },
        {
            label: { en: "phone number", ar: "رقم الهاتف" },
            value: user.phoneNumber,
            icon: <Smartphone />,
        },
        {
            label: { en: "currency", ar: "العملة" },
            value: user.currency,
            icon: <CircleDollarSign />,
        },
    ];

    const locale = useLocale();

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,_1fr))] gap-4 mt-8">
            {infoCards.map((card) => (
                <PersonalInfoCard
                    label={card.label[locale]}
                    icon={card.icon}
                    key={card.label[locale]}
                >
                    {card.value}
                </PersonalInfoCard>
            ))}
        </div>
    );
}

export default PersonalInfoGrid;
