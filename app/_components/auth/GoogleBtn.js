import { Button } from "@/components/ui/button";
import Image from "next/image";

function GoogleBtn() {
    return (
        <Button
            variant="outline"
            className="min-w-96 bg-transparent border-primary-200 flex items-center gap-2 py-0 cursor-pointer"
        >
            <Image src="/google.svg" alt="google icon" width={20} height={20} />
            <p>Continue with Google</p>
        </Button>
    );
}

export default GoogleBtn;
