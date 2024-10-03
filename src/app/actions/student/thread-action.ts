import axios from "axios";
import { Thread } from "@/app/type";
import { ThreadWithComments } from "@/app/type";

export async function getThreads(): Promise<Thread[]> {
    try {
        const response = await axios.get<Thread[]>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/threads`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching threads:", error);
        return [];
    }
}

export async function getThreadById(
    id: number
): Promise<ThreadWithComments | null> {
    try {
        const response = await axios.get<ThreadWithComments>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/threads/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching specific thread:", error);
        return null;
    }
}

export async function addThread(
    threadData: {
        category_id: number;
        user_id: number;
        title: string;
        content: string;
    },
    token: null | string
) {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/threads`);
        const response = await axios.post(url.toString(), threadData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating new thread:", error);
        throw error;
    }
}

export async function addThreadComment(
    threadData: { user_id: number; content: string },
    thread_id: number,
    token: null | string
) {
    try {
        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/threads/${thread_id}/comment`
        );
        const response = await axios.post(url.toString(), threadData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating thread comment:", error);
        throw error;
    }
}

export async function getAllCategories() {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`
        );
        return response.data;
    } catch (error) {
        console.log("Error:", error);
        return error;
    }
}
