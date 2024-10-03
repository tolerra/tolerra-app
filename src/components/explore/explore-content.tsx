"use client";
import { useState, useEffect } from "react";
import LongCourseCard from "./long-course-card";
import PaginationClient from "@/components/pagination-client";
import { ExploreProps } from "@/app/explore/page";
import getAllCourse from "@/app/actions/guest/explore-action";
import { Course } from "@/app/type"; 

const ITEMS_PER_PAGE = 4;

export default function ExploreContent({
    courseSearchParams,
}: {
    courseSearchParams: ExploreProps["searchParams"];
}) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchCourses = async () => {
            const allCourses = await getAllCourse(); 
            setCourses(allCourses);
        };

        fetchCourses();

        const pageParam = courseSearchParams?.page || "1";
        setCurrentPage(parseInt(pageParam, 10));
    }, [courseSearchParams]);

    const filteredCourses = courses.filter((course) => {
        let matches = true;
        if (courseSearchParams?.name) {
            matches = course.name
                .toLowerCase()
                .includes(courseSearchParams.name.toLowerCase());
        }
        if (courseSearchParams?.min_rating) {
            matches =
                matches &&
                parseFloat(course.average_rating) >= parseFloat(courseSearchParams.min_rating);
        }
        if (courseSearchParams?.category) {
            matches =
                matches &&
                course.category_name.toLowerCase() ===
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
        const params = new URLSearchParams(window.location.search);
        params.set("page", newPage.toString());
        window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
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
                                    title={course.name}
                                    description={course.brief}
                                    instructor={course.instructor_name} 
                                    rating={parseFloat(course.average_rating) || 0} 
                                    imageSrc={course.image || "https://picsum.photos/223/120"} //picsum placeholder
                                    category={course.category_name} 
                                    isLowVisionFriendly={true}                                    
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
