function PersonalInfoCard({ children, label, icon }) {
    return (
        <div className="bg-bg-100 rounded-md p-6 flex justify-between gap-4">
            <div>
                <h2 className="text-lg font-semibold mb-2 capitalize">
                    {label}
                </h2>
                <p className="text-text-300 text-sm">
                    {children || "Not specified"}
                </p>
            </div>
            <div className="text-accent-200">{icon}</div>
        </div>
    );
}

export default PersonalInfoCard;
