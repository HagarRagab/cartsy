"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

function SubmitBtn({ children, loadingLabel, btnClass = "primary-btn" }) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className={`${btnClass} w-full`}
            disabled={pending}
        >
            {pending ? (
                <>
                    <LoaderCircle className="animate-spin" size={20} />
                    {loadingLabel}
                </>
            ) : (
                children
            )}
        </Button>
    );
}

export default SubmitBtn;
