import axios from "axios";

export default async function getAllCourse() {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/ratings/top-reviews`
        );
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("Error:", error);
        return error;
    }
}
