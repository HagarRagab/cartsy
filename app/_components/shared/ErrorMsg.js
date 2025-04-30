import { CircleAlert } from "lucide-react";

function ErrorMsg({ children }) {
    return (
        <div className="mb-8 text-red-600 flex items-center gap-2 justify-center">
            <CircleAlert size={20} />
            {children}
        </div>
    );
}

export default ErrorMsg;
