import { createClient } from "@/src/utils/supabase/server";
import { supabase } from "@/src/app/_lib/supabase";

/////////////////////////////////////////////////////
// USER
// GET user by userId
export async function getUser(key, value) {
    const { data: user, error } = await supabase
        .from("Users")
        .select("*")
        .eq(key, value);

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot get user.");
    }

    return user;
}

// Check if user is already exist
export async function checkIfUserExist(email, userName) {
    const { data, error } = await supabase
        .from("Users")
        .select("id")
        .or(`email.eq.${email}, userName.eq.${userName}`);

    if (error) {
        console.log(error);
        throw new Error("Something went wrong. Cannot check user existance.");
    }

    return data;
}

// Create new user
export async function createNewUser(newUserInfo) {
    const { data, error } = await supabase
        .from("Users")
        .insert([newUserInfo])
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Something went wrong. Cannot create account.");
    }

    return data;
}

export async function removeUser(id) {
    const { error } = await supabase.from("Users").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Something went wrong. Cannot delete account.");
    }
}

export async function getAuthUser() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
}

export async function updateUserData(userId, newData) {
    const { data, error } = await supabase
        .from("Users")
        .update(newData)
        .eq("id", userId)
        .select()
        .single();

    return { data, error };
}
