import { LoaderCircle } from "lucide-react";

function SpinnerIcon({ className = "" }) {
    return <LoaderCircle size={20} className={`${className} animate-spin`} />;
}

export default SpinnerIcon;
