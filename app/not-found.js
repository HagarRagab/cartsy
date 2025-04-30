import Link from "next/link";

function NotFound() {
    return (
        <div className="w-full min-h-[calc(100vh-96px)] flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold">
                This page could not be found :(
            </h1>
            <Link
                href="/"
                className="text-lg mt-3 text-text-200 bg-accent-100 px-3 py-2 rounded-sm"
            >
                Go back home
            </Link>
        </div>
    );
}

export default NotFound;
