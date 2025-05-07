"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
    checkIfUserExist,
    createNewCart,
    createNewUser,
    getUser,
    removeUser,
} from "@/app/_lib/data-service";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function login(values) {
    const supabase = await createClient();

    const credientials = {
        email: values.email,
        password: values.password,
    };

    const { error, data } = await supabase.auth.signInWithPassword(
        credientials
    );

    if (error)
        return {
            success: false,
            message: "Wrong email or password",
        };

    // Creating new user in Users table for the first login
    const existingUser = await getUser("email", credientials.email);
    if (!existingUser.length) {
        const newUser = await createNewUser({
            id: data?.user.id,
            email: data?.user.email,
            userName: data?.user.user_metadata.userName,
            firstName: data?.user.user_metadata.firstName,
            lastName: data?.user.user_metadata.lastName,
        });
        if (!newUser) redirect("/error");

        // Create user associated row in Users_Carts table
        const newCart = await createNewCart(newUser.id);
        if (!newCart) {
            await removeUser(newUser.id);
            redirect("/error");
        }
    }

    revalidatePath("/", "layout");
    return {
        success: true,
        message: "successfully logged in.",
    };
}

export async function signup(values) {
    const supabase = await createClient();

    const credientials = {
        firstName: values.firstName,
        lastName: values.lastName,
        userName: values.userName,
        email: values.email,
        password: values.password,
    };

    // Check if userName or email is already exist
    const existingUser = await checkIfUserExist(
        credientials.email,
        credientials.userName
    );
    if (existingUser.length > 0)
        return {
            success: false,
            message: "This userName or email is already exist.",
        };

    const { error } = await supabase.auth.signUp({
        email: credientials.email,
        password: credientials.password,
        options: {
            data: {
                firstName: credientials.firstName,
                lastName: credientials.lastName,
                userName: credientials.userName,
            },
        },
    });

    if (error) {
        return {
            success: false,
            message:
                "Something went wrong. Cannot create account. Please try agian later.",
        };
    }

    revalidatePath("/", "layout");
    return {
        success: true,
        message:
            "Successfully created new account. Please check your email to activate your account.",
    };
}

export async function signOut() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
}

export async function loginWithGoogle() {
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${origin}/auth/callback`,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (error) redirect("/error");
    if (data.url) redirect(data.url); // use the redirect API for your server framework
}
