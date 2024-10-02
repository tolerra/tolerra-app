"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddCourseDialog from "@/components/instructor/add-course-dialog";
import EditCourseDialog from "@/components/instructor/edit-course-dialog";
import DeleteCourseDialog from "@/components/instructor/delete-course-dialog";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { CourseDialog } from "@/components/instructor/course-management/course-detail";

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

export default function CourseManagement() {
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

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-end mb-5 mt-5">
                <Button onClick={() => setIsAddDialogOpen(true)}>Tambah</Button>
            </div>
            <div className="flex justify-center mb-6">
                <h1 className="text-2xl font-bold">Atur Kursusmu</h1>
            </div>

            <div className="grid gap-4">
                {currentCourses.map((course) => (
                    <div
                        key={course.id}
                        className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-lg"
                    >
                        <Image
                            src={course.image || "/path-to-default-image.jpg"}
                            alt={course.title}
                            width={100}
                            height={60}
                        />

                        <div className="flex-grow text-center md:text-left ml-2">
                            <h2 className="font-semibold">{course.title}</h2>
                            <p className="text-sm text-gray-600">
                                {course.description}
                            </p>
                            {course.difficulty && (
                                <p className="text-sm text-gray-500">
                                    Difficulty : {course.difficulty}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-4 md:mt-0 justify-center">
                            <Button
                                variant="outline"
                                className="w-full md:w-auto"
                                onClick={() => {
                                    setSelectedCourse(course);
                                    setIsEditDialogOpen(true);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                className="w-full md:w-auto"
                                onClick={() => {
                                    setSelectedCourse(course);
                                    setIsDeleteDialogOpen(true);
                                }}
                            >
                                Hapus
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination className="mt-5">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            className={`${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    isActive={currentPage === page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 ${currentPage === page ? "bg-blue-900 text-white" : ""}`}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            className={`${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

            <AddCourseDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                course={null}
                onAddCourse={handleAddCourse}
            />
            <EditCourseDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                course={selectedCourse}
                onEditCourse={handleEditCourse}
            />
            <DeleteCourseDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                course={selectedCourse}
                onDeleteCourse={handleDeleteCourse}
            />
        </div>
    );
}
