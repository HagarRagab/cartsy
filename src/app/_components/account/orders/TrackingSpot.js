import { Truck } from "lucide-react";

function TrackingSpot({ label, status }) {
    return (
        <div className="flex flex-col justify-between items-center gap-4">
            <p className="font-semibold text-accent-200 capitalize">{label}</p>

            <div className="w-10 h-10 flex items-center justify-center relative">
                <div className="w-2 h-2 bg-bg-400 rounded-full mx-auto" />
                {label.toLowerCase() === status.toLowerCase() && (
                    <Truck className="absolute w-10 h-10 bg-primary-200 rounded-full p-2 text-text-300 mx-auto animateTruck" />
                )}
            </div>
        </div>
    );
}

export default TrackingSpot;
