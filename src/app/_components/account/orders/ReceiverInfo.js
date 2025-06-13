import { MapPin, Phone, User } from "lucide-react";

function ReceiverInfo({ order }) {
    const { receiverName, receiverPhoneNumber, shippingAddress } = order;

    return (
        <div className="flex flex-col col-start-1 gap-2">
            <div className="flex items-center gap-2">
                <User size={20} className="font-light" />
                <span>{receiverName}</span>
            </div>
            <div className="flex items-center gap-4">
                <Phone size={20} />
                <span>{receiverPhoneNumber}</span>
            </div>
            <div className="flex items-center gap-4">
                <MapPin size={20} />
                <span>{shippingAddress}</span>
            </div>
        </div>
    );
}

export default ReceiverInfo;
