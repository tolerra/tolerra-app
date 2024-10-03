import axios from "axios";
import { Course } from "@/app/type";

export default async function getAllCourse(): Promise<Course[]> { 
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`
        );
        console.log(response.data.courses);
        return response.data.courses; 
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}
