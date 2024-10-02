"use client";
import { useState } from "react";
import NotificationItem from "@/components/notification/notification-item";
import PaginationClient from "@/components/pagination-client";

const ITEMS_PER_PAGE = 5;

export const notifications = [
    {
        id: 1,
        type: "New Enrollment",
        template: "[User Name] has just enrolled in your course, '[Course Name]'. You can track their progress in your instructor dashboard.",
        userName: "Jane Doe",
        courseName: "Introduction to AI",
        time: "Just Now",
    },
    {
        id: 2,
        type: "Chapter Validated",
        template: "Your chapter, '[Chapter Name],' in the course '[Course Name]' has been successfully validated by the admin.",
        courseName: "Advanced AI",
        chapterName: "Neural Networks",
        time: "20:22",
    },
    {
        id: 3,
        type: "New Enrollment",
        template: "[User Name] has just enrolled in your course, '[Course Name]'. You can track their progress in your instructor dashboard.",
        userName: "Jane Smith",
        courseName: "Machine Learning 101",
        time: "19:31",
    },
    {
        id: 4,
        type: "New Enrollment",
        template: "[User Name] has just enrolled in your course, '[Course Name]'. You can track their progress in your instructor dashboard.",
        userName: "Emily Johnson",
        courseName: "Data Science Basics",
        time: "08:11",
    },
    {
        id: 5,
        type: "New Enrollment",
        template: "[User Name] has just enrolled in your course, '[Course Name]'. You can track their progress in your instructor dashboard.",
        userName: "Michael Brown",
        courseName: "Python for Beginners",
        time: "18 Sept",
    },
    {
        id: 6,
        type: "New Enrollment",
        template: "[User Name] has just enrolled in your course, '[Course Name]'. You can track their progress in your instructor dashboard.",
        userName: "Laura Wilson",
        courseName: "Web Development 101",
        time: "17 Sept",
    },
];

export default function NotificationList() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalNotifications = notifications.length;
    const lastPage = Math.ceil(totalNotifications / ITEMS_PER_PAGE);

    const displayedNotifications = notifications.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="grid grid-cols-1 gap-2 px-6 py-6">
            {displayedNotifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    type={notification.type}
                    template={notification.template}
                    userName={notification.userName}
                    courseName={notification.courseName}
                    chapterName={notification.chapterName}
                    time={notification.time}
                />
            ))}

            <PaginationClient
                current_page={currentPage}
                last_page={lastPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
