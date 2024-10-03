import axios from "axios";
import { Course } from "@/app/type";

export default async function getAllCourse(): Promise<{ courses: Course[], categories: { id: number, name: string }[] }> {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`);
        const courses: Course[] = response.data.courses;

        const categories = Array.from(
            new Set(courses.map((course) => course.category_name))
        ).map((name) => {
            const category = courses.find(course => course.category_name === name);
            return { id: category?.category_id || 0, name };
        });

        return { courses, categories };
    } catch (error) {
        console.error("Error:", error);
        return { courses: [], categories: [] };
    }
}
