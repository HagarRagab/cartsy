"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

function SubmitBtn({ label, loadingLabel, isLoading, btnClass = "" }) {
    return (
        <Button
            type="submit"
            className={`${btnClass} primary-btn`}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <LoaderCircle className="animate-spin" size={20} />
                    {loadingLabel}
                </>
            ) : (
                label
            )}
        </Button>
    );
}

export default SubmitBtn;
