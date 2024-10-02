"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { redirect } from "next/navigation";

export async function signIn(email: string, password: string) {
    try {
        // Fetch CSRF token
        const csrfToken = await getCsrfToken();
        if (!csrfToken) {
            return { success: false, error: "Failed to fetch CSRF token" };
        }

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
            { email, password },
            {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
                withCredentials: true, // Required to send cookies
            }
        );

        const data = response.data;
        const expires = new Date(Date.now() + 60 * 60 * 24 * 1000); // 24 hours

        document.cookie = `token=${data.token}; expires=${expires.toUTCString()}; path=/; secure; httpOnly`;
        document.cookie = `user=${JSON.stringify(data.user)}; expires=${expires.toUTCString()}; path=/; secure; httpOnly`;

        return { success: true };
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                error: error.response.data.message || "An error occurred",
            };
        }
        return { success: false, error: "An unexpected error occurred" };
    }
}

export async function SignUp(
    name: string,
    email: string,
    password: string,
    role: string,
    disabilityCard?: File
) {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("password_confirmation", password);
        formData.append("role", role);
        if (disabilityCard) {
            formData.append("disability_card", disabilityCard);
        }

        const csrfToken = await getCsrfToken();
        console.log(csrfToken);

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/register/${role}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRF-TOKEN": csrfToken,
                },
                withCredentials: true,
            }
        );

        if (response.status === 201) {
            const { user } = response.data;

            const expires = new Date(Date.now() + 60 * 60 * 24 * 1000); // 24 hours
            document.cookie = `token=${response.data.token}; expires=${expires.toUTCString()}; path=/; secure; httpOnly`;
            document.cookie = `user=${JSON.stringify(user)}; expires=${expires.toUTCString()}; path=/; secure; httpOnly`;
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

export async function getCsrfToken() {
    try {
        const response = await axios.get(
            "https://tolerra-api-d4dd0087ff22.herokuapp.com/token",
            {
                withCredentials: true,
            }
        );

        const csrfToken = response.data.csrf_token;
        if (csrfToken) {
            console.log(csrfToken);
            return csrfToken;
        } else {
            console.error("No CSRF token fetched");
            return null;
        }
    } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
        return null;
    }
}

export async function isLoggedIn() {
    const token = await getCsrfToken();
    return !!token;
}

export async function getUserData() {
    const userCookie = cookies().get("user");

    if (!userCookie) {
        return null;
    }

    return JSON.parse(userCookie.value);
}
