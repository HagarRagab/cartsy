"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
    checkIfUserExist,
    createNewCart,
    createNewUser,
    getUser,
    removeUser,
    updateUserData,
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
            // message: "Wrong email or password",
            message: error.message,
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
            message: error.message,
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

export async function forgotPassword(values) {
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${origin}/auth/update-password`,
    });

    if (error)
        return {
            status: "failed",
            message: error?.message,
        };

    return {
        status: "success",
        message: "Please check your email and click password reset link",
    };
}

export async function updatePassword(values, code) {
    const supabase = await createClient();

    const { error: codeError } = await supabase.auth.exchangeCodeForSession(
        code
    );

    if (codeError)
        return {
            status: "failed",
            message: codeError.message,
        };

    const { error: errorUpdate } = await supabase.auth.updateUser({
        password: values.password,
    });

    if (errorUpdate)
        return {
            status: "failed",
            message: errorUpdate.message,
        };
    else {
        return {
            status: "success",
            message: "successfully resetting password",
        };
    }
}
