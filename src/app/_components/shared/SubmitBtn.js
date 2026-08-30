"use client";

import { Button } from "@/src/components/ui/button";
import SpinnerIcon from "@/src/app/_components/shared/SpinnerIcon";

function SubmitBtn({
    children,
    isLoading,
    btnClass = "",
    ariaLabel,
    ...props
}) {
    return (
        <Button
            type="submit"
            className={btnClass}
            disabled={isLoading}
            aria-label={ariaLabel}
            {...props}
        >
            {isLoading ? <SpinnerIcon /> : children}
        </Button>
    );
}

export default SubmitBtn;
