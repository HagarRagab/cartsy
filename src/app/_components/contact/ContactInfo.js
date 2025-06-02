function ContactInfo({ label, value, icon }) {
    return (
        <li className="mb-3 flex items-center gap-2">
            <span className="text-accent-200">{icon}</span>
            <span className="min-w-25 font-semibold mr-2">{label}</span>
            <span>{value}</span>
        </li>
    );
}

export default ContactInfo;
