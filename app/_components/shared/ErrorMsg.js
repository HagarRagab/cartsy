import { TriangleAlert } from "lucide-react";

function ErrorMsg({ children, className = "" }) {
    return (
        <div
            className={`text-red-custom-200 flex flex-col items-center gap-2 justify-center ${className}`}
        >
            <TriangleAlert size={20} />
            {children}
        </div>
    );
}

export default ErrorMsg;
