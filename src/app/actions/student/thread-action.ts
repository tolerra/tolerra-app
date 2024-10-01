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

export async function addThread(threadData: {
    category_id: number;
    user_id: number;
    content: string;
}) {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/threads`,
            threadData
        );
        return response.data;
    } catch (error) {
        console.error("Error creating new thread:", error);
        throw error;
    }
}
