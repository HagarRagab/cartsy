import { Link2, Mails, MapPin, MessageCircle, Phone } from "lucide-react";

import { contactUsInfo } from "@/app/_utils/helper";
import PageContainer from "@/app/_components/shared/PageContainer";
import ContactInfo from "@/app/_components/contact/ContactInfo";
import SocialLinks from "@/app/_components/contact/SocialLinks";
import ContactForm from "@/app/_components/contact/ContactForm";

const contacts = [
    { icon: <MapPin />, label: "Address:", value: contactUsInfo.address },
    { icon: <Mails />, label: "Email:", value: contactUsInfo.email },
    {
        icon: <MessageCircle />,
        label: "Live Chat:",
        value: contactUsInfo.liveChat,
    },
    { icon: <Phone />, label: "Phone:", value: contactUsInfo.phone },
    {
        icon: <Link2 />,
        label: "Social Media:",
        value: "DM us on Instagram, Facebook, or Twitter @shopcartsy",
    },
];

function Page() {
    return (
        <PageContainer>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-bg-100 px-8 py-6 rounded-lg shadow-2xl flex flex-col">
                    <h1 className="font-semibold text-2xl mb-6">Contact us</h1>
                    <p>Still need help? We&apos;ve got your back.</p>
                    <div className="flex-1 flex items-center">
                        <ul>
                            {contacts.map((contact) => (
                                <ContactInfo
                                    key={contact.label}
                                    icon={contact.icon}
                                    label={contact.label}
                                    value={contact.value}
                                />
                            ))}
                        </ul>
                    </div>
                    <SocialLinks socialMediaLinks={contactUsInfo.socialMedia} />
                </div>
                <div className="bg-primary-200 px-8 py-6 rounded-lg shadow-2xl">
                    <ContactForm />
                </div>
            </div>
            <p className="text-center mt-10">
                We&apos;re always here for you &mdash; thanks for shopping with
                Cartsy!
            </p>
        </PageContainer>
    );
}

export default Page;
