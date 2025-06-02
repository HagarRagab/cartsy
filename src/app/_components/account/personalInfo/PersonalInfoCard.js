function PersonalInfoCard({ children, label, icon }) {
    return (
        <div className="bg-bg-100 rounded-md p-3 sm:p-6">
            <div className="flex items-center justify-between gap-4 mb-2">
                <h2 className="sm:text-lg font-semibold capitalize">{label}</h2>
                <div className="text-accent-200">{icon}</div>
            </div>
            <p className="text-text-300 text-xs sm:text-sm">
                {children || "Not specified"}
            </p>
        </div>
    );
}

export default PersonalInfoCard;
