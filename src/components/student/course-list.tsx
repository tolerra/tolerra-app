"use client";
import { useState } from "react";
import CourseItem from "@/components/student/course-item";
import PaginationClient from "@/components/pagination-client";
import React from "react";

const ITEMS_PER_PAGE = 8;

export const courses = [
    {
        id: 1,
        title: "Adobe Photoshop: A Comprehensive Guide",
        instructor: "Kim Lee",
        rating: 4.0,
        imageUrl: "/tolerra-text.svg",
        isLowVisionFriendly: true,
    },
    {
        id: 2,
        title: "Getting Started with Adobe After Effects",
        instructor: "Jhosua Hang",
        rating: 4.0,
        imageUrl: "/path/to/aftereffects.jpg",
        isLowVisionFriendly: true,
    },
    {
        id: 3,
        title: "A Guide to Kotlin: Android App For Beginners",
        instructor: "Jhosua Hang",
        rating: 4.0,
        imageUrl: "/path/to/kotlin.jpg",
        isLowVisionFriendly: true,
    },
    {
        id: 4,
        title: "Advanced PHP Programming",
        instructor: "Kim Lee",
        rating: 4.0,
        imageUrl: "/path/to/php.jpg",
        isLowVisionFriendly: true,
    },
    {
        id: 5,
        title: "React Native for Beginners",
        instructor: "John Doe",
        rating: 4.5,
        imageUrl: "/path/to/reactnative.jpg",
        isLowVisionFriendly: true,
    },
    {
        id: 6,
        title: "Introduction to Python Programming",
        instructor: "Emily Clark",
        rating: 4.8,
        imageUrl: "/path/to/python.jpg",
        isLowVisionFriendly: true,
    },
    {
        id: 7,
        title: "JavaScript for Web Development",
        instructor: "Peter Parker",
        rating: 4.2,
        imageUrl: "/path/to/javascript.jpg",
        isLowVisionFriendly: true,
    },
    {
        id: 8,
        title: "Mastering HTML and CSS",
        instructor: "Bruce Wayne",
        rating: 4.6,
        imageUrl: "/path/to/htmlcss.jpg",
        isLowVisionFriendly: true,
    },
    {
        id: 9,
        title: "Fullstack Web Development",
        instructor: "Clark Kent",
        rating: 4.9,
        imageUrl: "/path/to/fullstack.jpg",
        isLowVisionFriendly: true,
    },
];

export default function CourseList() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalCourses = courses.length;
    const lastPage = Math.ceil(totalCourses / ITEMS_PER_PAGE);

    const displayedCourses = courses.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 py-6">
                {displayedCourses.map((course) => (
                    <CourseItem
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        instructor={course.instructor}
                        rating={course.rating}
                        imageUrl={course.imageUrl}
                        isLowVisionFriendly={course.isLowVisionFriendly}
                    />
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <PaginationClient
                    current_page={currentPage}
                    last_page={lastPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
}
