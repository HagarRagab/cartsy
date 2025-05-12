import { LoaderCircle } from "lucide-react";

function Loading() {
    return (
        <div className="w-full h-[calc(100vh-136px)] flex items-center justify-center">
            <LoaderCircle size={40} className="text-accent-200 animate-spin" />
        </div>
    );
}

export default Loading;
