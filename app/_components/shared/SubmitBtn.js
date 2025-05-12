"use client";

import { Button } from "@/components/ui/button";
import SpinnerIcon from "@/app/_components/shared/SpinnerIcon";

function SubmitBtn({
    label,
    loadingLabel,
    isLoading,
    btnClass = "",
    ...props
}) {
    return (
        <Button
            type="submit"
            className={`${btnClass} primary-btn`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <SpinnerIcon />
                    {loadingLabel}
                </>
            ) : (
                label
            )}
        </Button>
    );
}

export default SubmitBtn;
