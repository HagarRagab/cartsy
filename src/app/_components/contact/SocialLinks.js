import { Facebook, Instagram } from "lucide-react";

function SocialLinks({ socialMediaLinks }) {
    return (
        <ul className="flex items-center gap-2 mt-4">
            <li className="w-fit p-3 rounded-full bg-primary-200 cursor-pointer">
                <a target="_blank" href={socialMediaLinks.facebook}>
                    <Facebook size={20} />
                </a>
            </li>
            <li className="w-fit p-3 rounded-full bg-primary-200 cursor-pointer">
                <a target="_blank" href={socialMediaLinks.instagram}>
                    <Instagram size={20} />
                </a>
            </li>
        </ul>
    );
}

export default SocialLinks;
