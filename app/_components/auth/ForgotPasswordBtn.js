import Link from "next/link";

function ForgotPasswordBtn() {
    return (
        <div className="relative -top-2 mb-0 flex justify-end">
            <Link
                href="/auth/forgot-password"
                variant="ghost"
                className="w-fit hover:underline transition-all mb-0 ml-auto cursor-pointer text-sm text-text-400 pr-0 pb-0 hover:bg-transparent"
            >
                Forgot password?
            </Link>
        </div>
    );
}

export default ForgotPasswordBtn;
