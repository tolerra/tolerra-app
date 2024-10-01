export interface Review {
    course_id: number;
    student_id: number;
    review: string;
    course: {
        id: number;
        name: string;
    };
    student: {
        id: number;
        name: string;
    };
}

export interface Course {
    id: number;
    name: string;
    slug: string;
    instructor_id: number;
    instructor_name: string;
    category_id: number;
    category_name: string;
    description: string | null;
    brief: string;
    image: string;
    average_rating: string;
    created_at: string;
    updated_at: string;
}
