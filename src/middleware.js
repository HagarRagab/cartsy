import { updateSession } from "@/src/utils/supabase/middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/src/i18n/routing";
import { NextResponse } from "next/server";
import { getAuthUser, getUser } from "@/src/app/_lib/data-services/data-user";
import { getCookie } from "./app/_lib/actions";

const handleI18nRouting = createMiddleware(routing);

// Define protected routes
const protectedRoutes = [
    "/account",
    "/account/orders",
    "/account/wishlist",
    "/account/settings",
    "/cart",
    "/checkout",
];

export async function middleware(request) {
    const response = handleI18nRouting(request);

    // Update session and get user info
    const sessionResponse = await updateSession(request, response);

    // Extract pathname without locale
    const pathname = request.nextUrl.pathname;
    const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, "") || "/";

    // Check if current route is protected
    const isProtectedRoute = protectedRoutes.some(
        (route) =>
            pathnameWithoutLocale === route ||
            pathnameWithoutLocale.startsWith(route + "/")
    );

    if (isProtectedRoute) {
        // Check if user is authenticated
        const authUser = await getAuthUser();
        const userInfo = await getUser("id", authUser.id);
        const guestLanguage = await getCookie("settings")?.language;

        if (!authUser) {
            // Get the locale from the pathname
            const locale =
                userInfo.language || guestLanguage || pathname.match(/^\/(en|ar)/)?.[1];

            // Redirect to login page with locale
            const loginUrl = new URL(`/${locale}/auth/login`, request.url);

            // Optional: Add redirect parameter to return user after login
            loginUrl.searchParams.set("redirect", pathname);

            return NextResponse.redirect(loginUrl);
        }
    }

    return sessionResponse;
}

export const config = {
    matcher: [
        "/:locale(account|account/orders|account/wishlist|account/settings|cart|checkout)",
        "/",
        "/(en|ar)/:path*",
    ],
};
