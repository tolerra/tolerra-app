import axios from "axios";
import { Review } from "@/app/type";

export async function getTailoredCourse() {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/recommendation`
        );
        console.log(response.data.courses);
        return response.data.courses;
    } catch (error) {
        console.log("error:", error);
        return [];
    }
}

export async function getPopularReview(): Promise<Review[]> {
    try {
        const response = await axios.get<Review[]>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/ratings/top-reviews`
        );
        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("error:", error);
        return [];
    }
}
