"use client";
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
import { Course } from "@/components/admin/hooks/use-dashboard-manager";
import { useState } from "react";

interface CourseListProps {
    courses: Course[];
    itemsPerPage: number;
    onValidate: (course: Course) => void;
}

export default function CourseList({
    courses,
    itemsPerPage,
    onValidate,
}: CourseListProps) {
    const [coursePage, setCoursePage] = useState(1);
    const totalCoursePages = Math.ceil(courses.length / itemsPerPage);
    const currentCourses = courses.slice(
        (coursePage - 1) * itemsPerPage,
        coursePage * itemsPerPage
    );

    return (
        <div>
            {currentCourses.map((course) => (
                <Card key={course.id} className="mb-5">
                    <CardContent className="flex flex-col md:flex-row justify-between items-center p-4">
                        <div className="text-center md:text-left">
                            <div className="text-lg font-semibold">
                                {course.title}
                            </div>
                            <div className="text-sm text-gray-500">
                                {course.date}
                            </div>
                            <span
                                className={`px-2 py-1 rounded-md text-xs ${course.status === "Pending" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}
                            >
                                {course.status}
                            </span>
                        </div>
                        <div className="flex justify-center md:justify-end space-x-2">
                            <Button variant="outline">Details</Button>
                            <Button onClick={() => onValidate(course)}>
                                Validate
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <Pagination className="mt-5">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={
                                coursePage > 1
                                    ? () => setCoursePage(coursePage - 1)
                                    : undefined
                            }
                            className={
                                coursePage === 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }
                        />
                    </PaginationItem>
                    {Array.from({ length: totalCoursePages }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={coursePage === i + 1}
                                onClick={() => setCoursePage(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={
                                coursePage < totalCoursePages
                                    ? () => setCoursePage(coursePage + 1)
                                    : undefined
                            }
                            className={
                                coursePage === totalCoursePages
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
