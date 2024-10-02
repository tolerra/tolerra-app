// components/instructor/CourseDetailManagement.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import EditCourseDialog from "@/components/instructor/edit-course-dialog";
import DeleteCourseDialog from "@/components/instructor/delete-course-dialog";

export interface CourseDialog {
    id: number;
    title: string;
    description: string;
    difficulty?: string;
    syllabus?: string;
    image?: string;
}

export interface CourseDialogProps {
    isOpen: boolean;
    onClose: () => void;
    course: CourseDialog | null;
    onAddCourse: (course: Omit<CourseDialog, "id">) => void;
    onEditCourse: (editedCourse: CourseDialog) => void;
    onDeleteCourse: (courseId: number) => void;
}

async function getCourseDetails(courseId: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}`,
        { cache: "no-cache" }
    );
    const data = await response.json();
    return data.course;
}

async function deleteCourse(courseId: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}`,
        {
            method: "DELETE",
        }
    );
    if (!response.ok) {
        throw new Error("Failed to delete course");
    }
}

async function updateCourse(
    courseId: string,
    courseData: Partial<CourseDialog>
) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(courseData),
        }
    );
    if (!response.ok) {
        throw new Error("Failed to update course");
    }
}

export default function CourseDetailManagement({
    courseId,
}: {
    courseId: string;
}) {
    const [course, setCourse] = useState<CourseDialog | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchCourseDetails() {
            const courseDetails = await getCourseDetails(courseId);
            setCourse(courseDetails);
        }
        fetchCourseDetails();
    }, [courseId]);

    const handleUpdateCourse = (updatedCourse: CourseDialog) => {
        updateCourse(courseId, updatedCourse)
            .then(() => {
                setCourse(updatedCourse);
                setIsEditDialogOpen(false);
            })
            .catch((error) => {
                console.error("Error updating course:", error);
            });
    };

    const handleDeleteCourse = () => {
        deleteCourse(courseId)
            .then(() => {
                setIsDeleteDialogOpen(false);
                router.push("/instructor/dashboard");
            })
            .catch((error) => {
                console.error("Error deleting course:", error);
            });
    };

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{course.title}</h1>
            <p>{course.description}</p>

            <button onClick={() => setIsEditDialogOpen(true)}>Edit</button>
            <button onClick={() => setIsDeleteDialogOpen(true)}>Delete</button>

            <EditCourseDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                course={course}
                onEditCourse={handleUpdateCourse}
            />
            <DeleteCourseDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                course={course}
                onDeleteCourse={handleDeleteCourse}
            />
        </div>
    );
}
