"use client";
import { useState, useEffect } from "react";
import LongCourseCard from "./long-course-card";
import PaginationClient from "@/components/pagination-client";
import { ExploreProps } from "@/app/explore/page";

const ITEMS_PER_PAGE = 4;

export default function ExploreContent({
    courseSearchParams,
}: {
    courseSearchParams: ExploreProps["searchParams"];
}) {
    const hardcodedCourses = [
        {
            id: 1,
            title: "Intro to JavaScript",
            description:
                "Learn JavaScript basics and start creating dynamic web applications.",
            instructor: "John Smith",
            rating: 2,
            category: "Development",
            imageSrc: "https://picsum.photos/223/120",
            isLowVisionFriendly: true,
        },
        {
            id: 2,
            title: "Advanced React",
            description: "Master React and build powerful web applications.",
            instructor: "Jane Doe",
            rating: 4.8,
            category: "Development",
            imageSrc: "https://picsum.photos/223/120",
            isLowVisionFriendly: true,
        },
        {
            id: 3,
            title: "Marketing Fundamentals",
            description: "Learn the core principles of marketing.",
            instructor: "Sarah Lee",
            rating: 3.5,
            category: "Business",
            imageSrc: "https://picsum.photos/223/120",
            isLowVisionFriendly: true,
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const url = new URL(window.location.href);
        const pageParam = url.searchParams.get("page");
        const page = pageParam ? parseInt(pageParam, 10) : 1;
        setCurrentPage(page);
    }, []);

    const filteredCourses = hardcodedCourses.filter((course) => {
        let matches = true;
        if (courseSearchParams?.name) {
            matches = course.title
                .toLowerCase()
                .includes(courseSearchParams.name.toLowerCase());
        }
        if (courseSearchParams?.min_rating) {
            matches =
                matches &&
                course.rating >= parseFloat(courseSearchParams.min_rating);
        }
        if (courseSearchParams?.category) {
            matches =
                matches &&
                course.category.toLowerCase() ===
                    courseSearchParams.category.toLowerCase();
        }
        return matches;
    });

    const totalCourses = filteredCourses.length;
    const lastPage = Math.ceil(totalCourses / ITEMS_PER_PAGE);

    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        const url = new URL(window.location.href);
        url.searchParams.set("page", newPage.toString());
        window.history.pushState({}, "", url);
    };

    return (
        <div className="grid grid-rows-[1fr_auto] w-full min-h-screen">
            <div className="w-full">
                {paginatedCourses.length > 0 ? (
                    <ul className="space-y-6">
                        {paginatedCourses.map((course) => (
                            <li key={course.id} className="w-full">
                                <LongCourseCard
                                    id={course.id}
                                    title={course.title}
                                    description={course.description}
                                    instructor={course.instructor}
                                    rating={course.rating}
                                    imageSrc={course.imageSrc}
                                    isLowVisionFriendly={course.isLowVisionFriendly}
                                    category={course.category}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex justify-center items-center w-full h-full">
                        <p className="text-center text-gray-500">
                            No courses found for the selected filters.
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-4">
                <PaginationClient
                    last_page={lastPage}
                    current_page={currentPage}
                    onPageChange={handlePageChange} 
                />
            </div>
        </div>
    );
}
