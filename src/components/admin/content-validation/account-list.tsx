import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface Account {
    id: number;
    name: string;
    date: string;
    status: string;
}

export default function AccountValidation() {
    const itemsPerPage = 4;
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

    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(accountData.length / itemsPerPage);
    const currentData = accountData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

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

    return (
        <>
            {currentData.map((user) => (
                <Card key={user.id} className="mb-5">
                    <CardContent className="flex flex-col md:flex-row justify-between items-center p-4">
                        {/* User info */}
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
                                        className={`px-2 py-1 rounded-md text-xs inline-block text-center ${user.status === "Pending" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}
                                    >
                                        {user.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Action buttons */}
                        <div className="flex items-center space-x-2 sm:mt-0 mt-3">
                            <div className="flex space-x-10">
                                <button onClick={() => handleAccept(user.id)}>
                                    <Image
                                        src="/assets/admin/accept.svg"
                                        width={19}
                                        height={19}
                                        alt="accept-button"
                                    />
                                </button>
                                <button onClick={() => handleDeny(user.id)}>
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
