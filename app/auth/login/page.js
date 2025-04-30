import Link from "next/link";
import LoginForm from "@/app/_components/auth/LoginForm";

function Page() {
    return (
        <>
            <LoginForm />
            <div className="flex items-center gap-2 mt-4 text-sm">
                <p>Create new account?</p>
                <Link
                    href="/auth/signup"
                    className="hover:underline transition-all font-semibold text-accent-200"
                >
                    sign up
                </Link>
            </div>
        </>
    );
}

export default Page;
