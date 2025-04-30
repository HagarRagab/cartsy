import { MapPin } from "lucide-react";

function Location() {
    // Change
    const address = "Alexandria, Egypt";

    return (
        <div>
            <div className="flex items-center gap-1 text-text-400">
                <MapPin size={20} />
                <span>Deliver to</span>
            </div>
            <p>{address}</p>
        </div>
    );
}

export default Location;
