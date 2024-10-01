"use client";
import { useState } from "react";

export interface Account {
    id: number;
    name: string;
    date: string;
    status: string;
}

export interface Course {
    id: number;
    title: string;
    name: string;
    date: string;
    status: string;
}

export function useDashboardManager() {
    const itemsPerPageAccount = 4;
    const [accountData, setAccountData] = useState<Account[]>([
        {
            id: 1,
            name: "Tono Haryono",
            date: "July 27, 2024",
            status: "Pending",
        },
        { id: 2, name: "Sri Wanti", date: "July 27, 2024", status: "Pending" },
        {
            id: 3,
            name: "Supri Jokono",
            date: "July 27, 2024",
            status: "Completed",
        },
        {
            id: 4,
            name: "Joko Suepomo",
            date: "July 27, 2024",
            status: "Completed",
        },
        {
            id: 5,
            name: "Budi Sutomo",
            date: "August 1, 2024",
            status: "Pending",
        },
    ]);

    const itemsPerPageCourse = 3;
    const [courseData, setCourseData] = useState<Course[]>([
        {
            id: 1,
            title: "Adobe Photoshop: Introduction",
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

    const [isValidateDialogOpen, setIsValidateDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Account | Course | null>(
        null
    );
    const [selectedType, setSelectedType] = useState<"account" | "course">(
        "account"
    );

    const handleAccept = (id: number, type: "account" | "course") => {
        if (type === "account") {
            setAccountData((prevData) =>
                prevData.map((user) =>
                    user.id === id ? { ...user, status: "Completed" } : user
                )
            );
        } else if (type === "course") {
            setCourseData((prevData) =>
                prevData.map((course) =>
                    course.id === id
                        ? { ...course, status: "Completed" }
                        : course
                )
            );
        }
        setIsValidateDialogOpen(false);
    };

    const handleDeny = (id: number, type: "account" | "course") => {
        if (type === "account") {
            setAccountData((prevData) =>
                prevData.filter((user) => user.id !== id)
            );
        } else if (type === "course") {
            setCourseData((prevData) =>
                prevData.filter((course) => course.id !== id)
            );
        }
        setIsValidateDialogOpen(false);
    };

    const handleValidateDialogOpen = (
        item: Account | Course,
        type: "account" | "course"
    ) => {
        setSelectedItem(item);
        setSelectedType(type);
        setIsValidateDialogOpen(true);
    };

    const handleValidateDialogClose = () => {
        setIsValidateDialogOpen(false);
        setSelectedItem(null);
    };

    const [accountPage, setAccountPage] = useState(1);
    const totalAccountPages = Math.ceil(
        accountData.length / itemsPerPageAccount
    );
    const currentAccountData = accountData.slice(
        (accountPage - 1) * itemsPerPageAccount,
        accountPage * itemsPerPageAccount
    );

    const [coursePage, setCoursePage] = useState(1);
    const totalCoursePages = Math.ceil(courseData.length / itemsPerPageCourse);
    const currentCourseData = courseData.slice(
        (coursePage - 1) * itemsPerPageCourse,
        coursePage * itemsPerPageCourse
    );

    return {
        currentAccountData,
        currentCourseData,
        accountPage,
        setAccountPage,
        totalAccountPages,
        coursePage,
        setCoursePage,
        totalCoursePages,
        handleAccept,
        handleDeny,
        isValidateDialogOpen,
        selectedItem,
        selectedType,
        handleValidateDialogOpen,
        handleValidateDialogClose,
    };
}
