import Image from "next/image";
import { useFormStatus } from "react-dom";

import { loginWithGoogle } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import SpinnerIcon from "@/app/_components/shared/SpinnerIcon";

function GoogleLogin() {
    return (
        <form action={loginWithGoogle}>
            <Submit />
        </form>
    );
}

function Submit() {
    const { pending } = useFormStatus();
    return (
        <Button
            variant="outline"
            className="min-w-96 bg-transparent border-primary-200 flex items-center gap-2 py-0 cursor-pointer"
            disabled={pending}
        >
            {pending ? (
                <SpinnerIcon />
            ) : (
                <Image
                    src="/google.svg"
                    alt="google icon"
                    width={20}
                    height={20}
                />
            )}
            <p>Continue with Google</p>
        </Button>
    );
}

export default GoogleLogin;
