import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import EditCourseDialog from "@/components/instructor/edit-course-dialog";
import DeleteCourseDialog from "@/components/instructor/delete-course-dialog";
import { CourseDialog } from "@/components/instructor/add-course-dialog";

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
    return response.json();
}

export default function CourseDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const router = useRouter();
    const courseId = params.id;
    const [courseDetails, setCourseDetails] = useState<CourseDialog | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const details = await getCourseDetails(courseId);
                setCourseDetails(details);
            } catch {
                setError("Failed to load course details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    const handleDeleteCourse = async (courseId: number) => {
        try {
            await deleteCourse(courseId.toString());
            router.push("/courses");
        } catch {
            setError("Failed to delete course.");
        } finally {
            setIsDeleteDialogOpen(false);
        }
    };

    const handleEditCourse = async (editedCourse: CourseDialog) => {
        try {
            const updatedCourse = await updateCourse(courseId, editedCourse);
            setCourseDetails(updatedCourse);
            setIsEditDialogOpen(false);
        } catch {
            setError("Failed to update course.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!courseDetails) {
        return <div>Course not found.</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">{courseDetails.title}</h1>
            <p className="mt-2">{courseDetails.description}</p>
            <div className="flex justify-end space-x-4 mt-4">
                <button
                    onClick={() => setIsEditDialogOpen(true)}
                    className="bg-blue-500 text-white px-8 py-2 rounded"
                >
                    Edit
                </button>
                <button
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Delete
                </button>
            </div>

            <EditCourseDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                course={courseDetails}
                onEditCourse={handleEditCourse}
            />
            <DeleteCourseDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                course={courseDetails}
                onDeleteCourse={handleDeleteCourse}
            />
        </div>
    );
}
