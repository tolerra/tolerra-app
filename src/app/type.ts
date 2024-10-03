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

export interface ValidationErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
}

export interface Thread {
    id: number;
    category_id: number;
    user_id: number;
    content: string;
    created_at: string;
}

export interface Comment {
    id: number;
    thread_id: number;
    content: string;
    created_at: string;
    updated_at: string;
}

export interface ThreadWithComments extends Thread {
    comments: Comment[];
}

export interface Notification {
    id: number;
    event_type: string;
    msg: string;
    user: {
        id: number;
        name: string;
    };
    created_at: string;
}
