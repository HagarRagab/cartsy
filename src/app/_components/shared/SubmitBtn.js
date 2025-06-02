"use client";

import { Button } from "@/src/components/ui/button";
import SpinnerIcon from "@/src/app/_components/shared/SpinnerIcon";

function SubmitBtn({ children, isLoading, btnClass = "", ...props }) {
    return (
        <Button
            type="submit"
            className={btnClass}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <SpinnerIcon /> : children}
        </Button>
    );
}

export default SubmitBtn;
