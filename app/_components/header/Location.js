"use client";

import { MapPin } from "lucide-react";
import { useAuth } from "@/app/_context/AuthContext";

function Location() {
    const { user } = useAuth();
    const address = `${user.city}, ${user.country}`;

    if (!user || !user.city) return null;

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
