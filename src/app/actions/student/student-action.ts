"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function enrollCourse(courseId: number) {
    const token = cookies().get("token")?.value;

    if (!token) {
        throw new Error("User not authenticated");
    }

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/student/courses/${courseId}/enroll`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.message || "Failed to enroll in the course"
            );
        }
        throw new Error("An unexpected error occurred");
    }
}

export async function getCourseData(id: number) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`,
        {
            cache: "no-cache",
        }
    );
    const data = await response.json();

    return data.course;
}

export async function getEnrolledCourse(token: null | string) {
    try {
        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/student/enrolled-course`
        );
        const response = await axios.get(url.toString(), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        return [];
    }
}
