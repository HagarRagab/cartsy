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
import CartProvider from "@/src/app/_context/CartContext";

const font = Roboto({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "700"],
    variable: "--font-roboto",
});

const arabicFont = Noto_Sans_Arabic({
    subsets: ["arabic"],
    display: "swap",
    weight: ["400", "500", "700"],
    variable: "--font-noto-sans-arabic",
});

export const metadata = {
    title: {
        template: "%s | Cartsy",
        default: "Welcome | Cartsy shopping website",
    },
    description:
        "Cartsy are more than just an e-commerce platform — we're a community-first shopping destination that connects people with curated collections of fashion, home goods, beauty, gadgets, and everyday essentials, all in one place.",
    openGraph: {
        title: "Cartsy - Your Community-First Shopping Destination",
        description:
            "Discover curated collections of fashion, home goods, beauty, gadgets, and everyday essentials at Cartsy.",
        url: "https://cartsy.com",
        siteName: "Cartsy",
        images: [
            {
                url: "/websitePreview.jpg",
                width: 1200,
                height: 630,
                alt: "Cartsy E-commerce Platform",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Cartsy - Your Community-First Shopping Destination",
        description:
            "Discover curated collections of fashion, home goods, beauty, gadgets, and everyday essentials at Cartsy.",
        images: ["/websitePreview.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "your-google-verification-code",
    },
};

export default async function RootLayout({ children, params }) {
    const authUser = await getAuthUser();
    const user = authUser && (await getUser("id", authUser.id))[0];

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
                    locale === "ar"
                        ? `${arabicFont.variable} font-sans`
                        : `${font.variable} font-sans`
                } relative text-text-100 overflow-x-hidden`}
            >
                <NextIntlClientProvider messages={messages}>
                    <AuthProvider user={user} settingsCookie={settingsCookie}>
                        <CartProvider>
                            <a
                                href="#main-content"
                                className="absolute top-4 left-4 -translate-x-[9999px] focus:translate-x-0 bg-primary-200 text-text-200 px-4 py-2 rounded-md z-50 transition-transform"
                            >
                                Skip to main content
                            </a>
                            <Header user={user} />
                            <Navbar />
                            <main
                                id="main-content"
                                className="bg-bg-200 min-h-[calc(100vh-136px)] w-full"
                            >
                                {children}
                            </main>
                            <div id="checkout-modal"></div>
                            <Toaster />
                            <Footer />
                        </CartProvider>
                    </AuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
