import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";
import {
    createNewCart,
    createNewUser,
    getUser,
    updateUserData,
} from "@/app/_lib/data-service";

export async function GET(request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/";

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            const { data, error: userError } = await supabase.auth.getUser();

            if (userError) {
                console.error("Cannot fetch user data " + userError);
                return NextResponse.redirect(`${origin}/error`);
            }

            // Creating new user in Users table for the first login
            const existingUser = await getUser("email", data.user.email);
            if (!existingUser.length) {
                const newUser = await createNewUser({
                    id: data.user.id,
                    email: data.user.email,
                    firstName: data.user.user_metadata.name.split(" ")[0],
                    lastName: data.user.user_metadata.name.split(" ")[1],
                    avatar: data.user.user_metadata.avatar_url,
                });
                if (!newUser) return NextResponse.redirect(`${origin}/error`);

                // Create userName
                const { error: updateError } = await updateUserData(
                    newUser.id,
                    {
                        userName: `${newUser.firstName}${newUser.lastName}${newUser.suffix}`,
                    }
                );
                if (updateError) {
                    await removeUser(newUser.id);
                    return NextResponse.redirect(`${origin}/error`);
                }

                // Create user associated row in Users_Carts table
                const newCart = await createNewCart(newUser.id);
                if (!newCart) {
                    await removeUser(newUser.id);
                    return NextResponse.redirect(`${origin}/error`);
                }
            }

            const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
            const isLocalEnv = process.env.NODE_ENV === "development";
            if (isLocalEnv) {
                // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
                return NextResponse.redirect(`${origin}${next}`);
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`);
            } else {
                return NextResponse.redirect(`${origin}${next}`);
            }
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    // return NextResponse.redirect(`${origin}/error`);
}
