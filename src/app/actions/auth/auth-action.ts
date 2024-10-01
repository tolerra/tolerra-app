"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { AxiosError } from "axios";
import { ValidationErrorResponse } from "@/app/type";
import { redirect } from "next/navigation";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

export async function SignIn(email: string, password: string) {
    try {
        const response = await axios.post(`${baseUrl}/login`, {
            email,
            password,
        });

        const data = response.data;
        const expires = new Date(Date.now() + 60 * 60 * 24 * 1000);

        cookies().set("token", data.token, {
            secure: true,
            httpOnly: true,
            expires: expires,
        });

        cookies().set("user", JSON.stringify(data.user), {
            secure: true,
            httpOnly: true,
            expires: expires,
        });

        return { success: true };
    } catch (error: unknown) {
        const err = error as AxiosError<ValidationErrorResponse>;
        console.log("error:", err);
        return {
            success: false,
            error: err.response?.data?.message || "An error occurred",
        };
    }
}

export async function SignUp(
    name: string,
    email: string,
    password: string,
    role: string
) {
    try {
        await axios.post(`${baseUrl}/register/${role}`, {
            name,
            email,
            password,
        });
        return { success: true };
    } catch (error: unknown) {
        const err = error as AxiosError<ValidationErrorResponse>;
        console.log("error:", err);
        return {
            success: false,
            error: err.response?.data?.message || "An error occured",
        };
    }
}

export async function signOut() {
    cookies().delete("tokken");
    cookies().delete("user");
    redirect("/");
}

export async function getUserRole() {
    const userCokkie = cookies().get("user");

    if (!userCokkie) {
        return null;
    }

    const user = JSON.parse(userCokkie.value);

    return user.role;
}

export async function getUserId() {
    const userCookie = cookies().get("user");

    if (!userCookie) {
        return null;
    }

    const user = JSON.parse(userCookie.value);

    return user.id;
}

export async function getUserToken() {
    const tokenCokkie = cookies().get("user");

    if (!tokenCokkie) {
        return null;
    }

    return tokenCokkie.value;
}

export async function isLoggedIn() {
    const token = await getUserToken();
    return !!token;
}

export async function getUserData() {
    const userCookie = cookies().get("user");

    if (!userCookie) {
        return null;
    }

    return JSON.parse(userCookie.value);
}
