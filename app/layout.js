import { Roboto } from "next/font/google";
import { Toaster } from "sonner";

import Footer from "@/app/_components/footer/Footer";
import Header from "@/app/_components/header/Header";
import Navbar from "@/app/_components/navbar/Navbar";
import AuthProvider from "@/app/_context/AuthContext";
import { getAuthUser, getUser } from "@/app/_lib/data-service";
import "@/app/_styles/globals.css";

const font = Roboto({
    subsets: ["latin"],
    display: "swap",
    weight: "400",
});

export const metadata = {
    title: {
        template: "%s | Cartsy",
        default: "Welcome | Cartsy shopping website",
    },
    description:
        "Cartsy are more than just an e-commerce platform — we're a community-first shopping destination that connects people with curated collections of fashion, home goods, beauty, gadgets, and everyday essentials, all in one place.",
};

export default async function RootLayout({ children }) {
    const authUser = await getAuthUser();
    const user = authUser && (await getUser("email", authUser.email))[0];

    return (
        <html lang="en" style={{ filter: "none" }}>
            <body className={`${font.className} text-text-100`}>
                <AuthProvider user={user}>
                    <Header />
                    <Navbar />
                    <main className="bg-bg-200 min-h-[calc(100vh-136px)] w-full">
                        {children}
                    </main>
                    <Toaster />
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
