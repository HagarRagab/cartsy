import { Roboto, Noto_Sans_Arabic } from "next/font/google";
import { Toaster } from "sonner";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";

import Footer from "@/src/app/_components/footer/Footer";
import Header from "@/src/app/_components/header/Header";
import Navbar from "@/src/app/_components/navbar/Navbar";
import AuthProvider from "@/src/app/_context/AuthContext";
import { getCookie } from "@/src/app/_lib/actions";
import { getAuthUser, getUser } from "@/src/app/_lib/data-services/data-user";
import "@/src/app/_styles/globals.css";
import { getMessages } from "next-intl/server";
import { direction } from "@/src/app/_utils/helper";

const font = Roboto({
    subsets: ["latin"],
    display: "swap",
    weight: "400",
});

const arabicFont = Noto_Sans_Arabic({
    subsets: ["arabic"],
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

export default async function RootLayout({ children, params }) {
    const authUser = await getAuthUser();
    const user = authUser && (await getUser("email", authUser.email))[0];

    const { locale } = await params;
    const settingsCookie = await getCookie("settings");

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    const messages = await getMessages();

    return (
        <html lang={locale} dir={direction(locale)} style={{ filter: "none" }}>
            <body
                className={`${
                    locale === "ar" ? arabicFont.className : font.className
                } relative text-text-100 overflow-x-hidden`}
            >
                <NextIntlClientProvider messages={messages}>
                    <AuthProvider user={user} settingsCookie={settingsCookie}>
                        <Header user={user} />
                        <Navbar />
                        <main className="bg-bg-200 min-h-[calc(100vh-136px)] w-full">
                            {children}
                        </main>
                        <div id="modal"></div>
                        <Toaster />
                        <Footer />
                    </AuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
