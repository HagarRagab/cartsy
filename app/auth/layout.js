"use client";

import { ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";

import GoogleBtn from "@/app/_components/auth/GoogleBtn";
import { useAuth } from "@/app/_context/AuthContext";

function Layout({ children }) {
    const { user } = useAuth();
    if (user) redirect("/");

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-image">
            <div className="p-10 flex flex-col justify-center items-center bg-bg-100 shadow-2xl rounded-2xl m-10">
                <div className="text-center mb-8">
                    <h1 className="font-semibold text-xl mb-1">
                        Register/Sign in
                    </h1>
                    <p className="flex items-center gap-2">
                        <ShieldCheck size={15} />
                        You information is protected
                    </p>
                </div>
                {children}
                <div className="relative my-8 before:min-w-96 before:h-[0.5px] before:bg-primary-200 before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 after:px-4 after:content-['OR'] after:bg-bg-100 after:absolute after:top-1/2 after:left-1/2 after:-translate-1/2 after:text-sm" />
                <GoogleBtn />
            </div>
        </div>
    );
}

export default Layout;
