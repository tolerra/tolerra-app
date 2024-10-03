"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { redirect } from "next/navigation";

export async function signIn(email: string, password: string) {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
            { email, password },
            {
                withCredentials: true,
            }
        );

        const { token, user } = response.data;

        // Set cookies
        cookies().set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        });

        cookies().set(
            "user",
            JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }),
            {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 24 hours
                path: "/",
            }
        );

        return { success: true, user: user };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                error: error.response.data.message || "Invalid credentials",
            };
        }
        return { success: false, error: "An unexpected error occurred" };
    }
}

export async function SignUp(signupData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
    disability_card?: string | null | undefined;
}) {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/register/${signupData.role}`,
            signupData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        if (response.status === 201) {
            const { user } = response.data;

            // Set cookies
            cookies().set("token", response.data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 24 hours
                path: "/",
            });

            cookies().set("user", JSON.stringify(user), {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 24 hours
                path: "/",
            });
        }

        return { success: true, data: response.data };
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                error: error.response.data.message || "An error occurred",
            };
        }
        return {
            success: false,
            error: "An unexpected error occurred",
        };
    }
}

export async function signOut() {
    cookies().delete("token");
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

export async function fetchUserProfile() {
    const userId = await getUserId();
    if (!userId) {
        return null;
    }

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}/profile`,
            {
                headers: {
                    Authorization: `Bearer ${cookies().get("token")?.value}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        return null;
    }
}

export async function isDisabilityValidated(): Promise<boolean> {
    const profile = await fetchUserProfile();
    if (!profile) {
        return false;
    }
    return profile.disability_verification;
}

export async function getUserToken() {
    const tokenCookie = cookies().get("token");
    if (!tokenCookie) {
        return null;
    }

    return tokenCookie.value;
}
