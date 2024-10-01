import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import ValidateDialog from "@/components/admin/validate-dialog";

interface Course {
    id: number;
    title: string;
    name: string;
    date: string;
    status: string;
}

export default function CourseValidation() {
    const itemsPerPage = 3;
    const [courseData, setCourseData] = useState<Course[]>([
        {
            id: 1,
            title: "Adobe Photoshop: Introduction to Photoshop",
            name: "Kim Lee",
            date: "July 27, 2024",
            status: "Pending",
        },
        {
            id: 2,
            title: "Adobe Photoshop: Layers and Masks",
            name: "Kim Jong",
            date: "July 27, 2024",
            status: "Pending",
        },
        {
            id: 3,
            title: "Adobe Photoshop: Advanced Editing",
            name: "Kim Kir",
            date: "July 28, 2024",
            status: "Pending",
        },
        {
            id: 4,
            title: "Adobe Photoshop: Color Correction",
            name: "Kim Soo",
            date: "July 29, 2024",
            status: "Completed",
        },
    ]);

    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(courseData.length / itemsPerPage);
    const currentData = courseData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const [isValidateDialogOpen, setIsValidateDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Course | null>(null);

    const handleAccept = (id: number) => {
        setCourseData((prevData) =>
            prevData.map((course) =>
                course.id === id ? { ...course, status: "Completed" } : course
            )
        );
        setIsValidateDialogOpen(false);
    };

    const handleDeny = (id: number) => {
        setCourseData((prevData) =>
            prevData.filter((course) => course.id !== id)
        );
        setIsValidateDialogOpen(false);
    };

    return (
        <>
            {currentData.map((courseItem) => (
                <Card key={courseItem.id} className="mb-5">
                    <CardContent className="flex flex-col md:flex-row justify-between items-center p-4">
                        <div className="items-center text-center md:items-start md:text-left mb-4 md:mb-0">
                            <div className="text-[16px] font-semibold mb-2">
                                {courseItem.title}
                            </div>
                            <div className="text-[15px] text-[#A2A2A2] mb-2">
                                {courseItem.name}
                            </div>
                            <div className="text-[13px] text-gray-500 mb-2">
                                {courseItem.date}
                            </div>
                            <span
                                className={`px-2 py-1 rounded-md text-xs inline-block ${courseItem.status === "Pending" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}
                            >
                                {courseItem.status}
                            </span>
                        </div>
                        <div className="flex justify-center md:justify-end items-center space-x-2">
                            <Button
                                className="w-full md:w-auto text-center"
                                variant={"outline"}
                            >
                                Details
                            </Button>
                            <Button
                                onClick={() => {
                                    setSelectedItem(courseItem);
                                    setIsValidateDialogOpen(true);
                                }}
                            >
                                Validate
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <ValidateDialog
                isOpen={isValidateDialogOpen}
                onClose={() => setIsValidateDialogOpen(false)}
                onAccept={() => {
                    if (selectedItem?.id !== undefined) {
                        handleAccept(selectedItem.id);
                    }
                }}
                onDeny={() => {
                    if (selectedItem?.id !== undefined) {
                        handleDeny(selectedItem.id);
                    }
                }}
                name={selectedItem?.title || ""}
                type="course"
            />
            {/* Pagination */}
            <Pagination className="mt-5">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={
                                page === 1 ? undefined : () => setPage(page - 1)
                            }
                            className={`${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={page === i + 1}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={
                                page === totalPages
                                    ? undefined
                                    : () => setPage(page + 1)
                            }
                            className={`${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
}
