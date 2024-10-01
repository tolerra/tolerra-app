"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Db() {
    const itemsPerPageAccount = 4;
    const [accountData, setAccountData] = useState([
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
        }, // Extra item for pagination
    ]);

    const itemsPerPageCourse = 3;
    const [courseData] = useState([
        {
            id: 1,
            name: "Chapter 1: Introduction to Photoshop",
            date: "July 27, 2024",
            status: "Pending",
        },
        {
            id: 2,
            name: "Chapter 2: Layers and Masks",
            date: "July 27, 2024",
            status: "Pending",
        },
        {
            id: 3,
            name: "Chapter 3: Advanced Editing",
            date: "July 28, 2024",
            status: "Pending",
        },
        {
            id: 4,
            name: "Chapter 4: Color Correction",
            date: "July 29, 2024",
            status: "Completed",
        }, // Extra item for pagination
    ]);

    const handleAccept = (id: number) => {
        setAccountData((prevData) =>
            prevData.map((user) =>
                user.id === id ? { ...user, status: "Completed" } : user
            )
        );
    };

    const handleDeny = (id: number) => {
        setAccountData((prevData) => prevData.filter((user) => user.id !== id));
    };

    const [activeTab, setActiveTab] = useState("account");

    // Pagination state for account validation
    const [accountPage, setAccountPage] = useState(1);
    const totalAccountPages = Math.ceil(
        accountData.length / itemsPerPageAccount
    );
    const currentAccountData = accountData.slice(
        (accountPage - 1) * itemsPerPageAccount,
        accountPage * itemsPerPageAccount
    );

    // Pagination state for course validation
    const [coursePage, setCoursePage] = useState(1);
    const totalCoursePages = Math.ceil(courseData.length / itemsPerPageCourse);
    const currentCourseData = courseData.slice(
        (coursePage - 1) * itemsPerPageCourse,
        coursePage * itemsPerPageCourse
    );

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex justify-center space-x-4 mb-6 flex-wrap">
                    <TabsList className="flex justify-center space-x-2">
                        <TabsTrigger
                            value="account"
                            className={`text-base md:text-xl font-semibold whitespace-nowrap ${
                                activeTab === "account"
                                    ? "text-black border-b-2 border-black"
                                    : "text-gray-400"
                            }`}
                        >
                            Account Validation
                        </TabsTrigger>
                        <TabsTrigger
                            value="course"
                            className={`text-base md:text-xl font-semibold whitespace-nowrap ${
                                activeTab === "course"
                                    ? "text-black border-b-2 border-black"
                                    : "text-gray-400"
                            }`}
                        >
                            Course Validation
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Account Validation */}
                <TabsContent value="account">
                    {currentAccountData.map((user) => (
                        <Card key={user.id} className="mb-5">
                            <CardContent className="flex flex-col md:flex-row justify-between items-center p-4">
                                <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                    <div>
                                        <div className="text-lg font-semibold mb-3 text-center sm:text-left">
                                            {user.name}
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                                            <div className="text-sm text-gray-500 text-center sm:text-left">
                                                {user.date}
                                            </div>
                                            <span
                                                className={`px-2 py-1 rounded-md text-xs inline-block text-center ${
                                                    user.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-600"
                                                        : "bg-green-100 text-green-600"
                                                }`}
                                            >
                                                {user.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 sm:mt-0 mt-3">
                                    <div className="flex space-x-10">
                                        <button
                                            onClick={() =>
                                                handleAccept(user.id)
                                            }
                                        >
                                            <Image
                                                src="/assets/admin/accept.svg"
                                                width={19}
                                                height={19}
                                                alt="accept-button"
                                            />
                                        </button>

                                        <button
                                            onClick={() => handleDeny(user.id)}
                                        >
                                            <Image
                                                src="/assets/admin/denied.svg"
                                                width={19}
                                                height={19}
                                                alt="deny-button"
                                            />
                                        </button>

                                        <Link href="/">
                                            <Image
                                                src="/assets/admin/download.svg"
                                                width={19}
                                                height={19}
                                                alt="download-button"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Pagination for Account Validation */}
                    <Pagination className="mt-5">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={
                                        accountPage === 1
                                            ? undefined
                                            : () =>
                                                  setAccountPage(
                                                      accountPage - 1
                                                  )
                                    } // Kondisi disable diatasi dengan conditional rendering
                                    className={`${accountPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`} // Styling untuk disabled state
                                />
                            </PaginationItem>

                            {Array.from(
                                { length: totalAccountPages },
                                (_, page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            isActive={accountPage === page + 1}
                                            onClick={() =>
                                                setAccountPage(page + 1)
                                            }
                                        >
                                            {page + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={
                                        accountPage === totalAccountPages
                                            ? undefined
                                            : () =>
                                                  setAccountPage(
                                                      accountPage + 1
                                                  )
                                    } // Kondisi disable diatasi dengan conditional rendering
                                    className={`${accountPage === totalAccountPages ? "opacity-50 cursor-not-allowed" : ""}`} // Styling untuk disabled state
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </TabsContent>

                <TabsContent value="course">
                    {currentCourseData.map((user, index) => (
                        <Card key={index} className="mb-5">
                            <CardContent className="flex flex-col md:flex-row justify-between items-center p-4">
                                <div className="items-center text-center md:items-start md:text-left mb-4 md:mb-0">
                                    <div className="text-lg font-semibold mb-3">
                                        {user.name}
                                    </div>
                                    <div className="text-sm text-gray-500 mb-3">
                                        {user.date}
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded-md text-xs inline-block ${
                                            user.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : "bg-green-100 text-green-600"
                                        }`}
                                    >
                                        {user.status}
                                    </span>
                                </div>
                                <div className="flex justify-center md:justify-end items-center space-x-2">
                                    <Button className="w-full md:w-auto text-center">
                                        Details
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
                                        coursePage === 1
                                            ? undefined
                                            : () =>
                                                  setCoursePage(coursePage - 1)
                                    } // Kondisi disable diatasi dengan conditional rendering
                                    className={`${coursePage === 1 ? "opacity-50 cursor-not-allowed" : ""}`} // Styling untuk disabled state
                                />
                            </PaginationItem>

                            {Array.from(
                                { length: totalCoursePages },
                                (_, page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            isActive={coursePage === page + 1}
                                            onClick={() =>
                                                setCoursePage(page + 1)
                                            }
                                        >
                                            {page + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={
                                        coursePage === totalCoursePages
                                            ? undefined
                                            : () =>
                                                  setCoursePage(coursePage + 1)
                                    } // Kondisi disable diatasi dengan conditional rendering
                                    className={`${coursePage === totalCoursePages ? "opacity-50 cursor-not-allowed" : ""}`} // Styling untuk disabled state
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </TabsContent>
            </Tabs>
        </div>
    );
}
