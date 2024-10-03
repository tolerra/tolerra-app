"use client";
import { useState, useEffect } from "react";
import PaginationClient from "@/components/pagination-client";
import { getEnrolledCourse } from "@/app/actions/student/student-action";
import { Course } from "@/app/type";
import CourseCard from "@/components/course-card";
import { getUserToken } from "@/app/actions/auth/auth-action";

const ITEMS_PER_PAGE = 8;

interface EnrolledCourseResponse {
    course: Course;
}

export default function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
            setIsLoading(true);
            const token = await getUserToken();
            const enrolledCoursesResponse = await getEnrolledCourse(token);
            const enrolledCourses = enrolledCoursesResponse.map(
                (item: EnrolledCourseResponse) => item.course
            );
            setCourses(enrolledCourses);
            setIsLoading(false);
        }
        fetchCourses();
    }, []);

    const totalCourses = courses.length;
    const lastPage = Math.ceil(totalCourses / ITEMS_PER_PAGE);

    const displayedCourses = courses.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 py-6">
                {displayedCourses.map((course: Course) => (
                    <CourseCard
                        key={course.id}
                        id={course.id}
                        name={course.name}
                        instructor_name={course.instructor_name}
                        average_rating={course.average_rating}
                        isDashboard={true}
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
