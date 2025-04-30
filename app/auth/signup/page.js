import SignupForm from "@/app/_components/auth/SignupForm";
import Link from "next/link";

function Page() {
    return (
        <>
            <SignupForm />
            <div className="flex items-center gap-2 mt-4 text-sm">
                <p>Already have an account?</p>
                <Link
                    href="/auth/login"
                    className="hover:underline transition-all font-semibold text-accent-200"
                >
                    Log in
                </Link>
            </div>
        </>
    );
}

export default Page;
