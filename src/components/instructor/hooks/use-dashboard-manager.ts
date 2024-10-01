"use client";
import { useState } from "react";

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

const initialCourses: CourseDialog[] = [
    {
        id: 1,
        title: "Go: The Complete Developer's Guide (Golang)",
        description:
            "Learn Go ('Golang') from the ground up & in great depth by building multiple demo projects, incl. a REST API",
        difficulty: "Intermediate",
        syllabus: "Introduction to Go, Basic Syntax, Advanced Concepts",
        image: "/assets/instruktor/thumbnail.svg",
    },
];

export default function useDashboardManager() {
    const [courses, setCourses] = useState<CourseDialog[]>(initialCourses);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseDialog | null>(
        null
    );
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLastCourse = currentPage * itemsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(courses.length / itemsPerPage);

    const handleAddCourse = (newCourse: Omit<CourseDialog, "id">) => {
        const id =
            courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
        setCourses([...courses, { ...newCourse, id }]);
        setIsAddDialogOpen(false);
    };

    const handleEditCourse = (editedCourse: CourseDialog) => {
        setCourses(
            courses.map((course) =>
                course.id === editedCourse.id ? editedCourse : course
            )
        );
        setIsEditDialogOpen(false);
    };

    const handleDeleteCourse = (courseId: number) => {
        setCourses(courses.filter((course) => course.id !== courseId));
        setIsDeleteDialogOpen(false);
    };

    return {
        courses: currentCourses,
        totalPages,
        currentPage,
        setCurrentPage,
        isAddDialogOpen,
        setIsAddDialogOpen,
        isEditDialogOpen,
        setIsEditDialogOpen,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        selectedCourse,
        setSelectedCourse,
        handleAddCourse,
        handleEditCourse,
        handleDeleteCourse,
    };
}
