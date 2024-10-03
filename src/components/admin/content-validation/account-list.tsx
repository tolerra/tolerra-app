import React, { useState, useEffect } from "react";
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
import { getDisabilityVerifications } from "@/app/actions/admin/admin-action";
import { getUserToken } from "@/app/actions/auth/auth-action";

interface DisabilityVerification {
    id: number;
    user: {
        name: string;
    };
    created_at: string;
    status: string;
}

export default function AccountValidation() {
    const itemsPerPage = 4;
    const [verifications, setVerifications] = useState<
        DisabilityVerification[]
    >([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const token = await getUserToken();
            const data = await getDisabilityVerifications(token);
            setVerifications(data);
        };
        fetchData();
    }, []);

    const totalPages = Math.ceil(verifications.length / itemsPerPage);
    const currentData = verifications.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleAccept = (id: number) => {
        setVerifications((prevData) =>
            prevData.map((verification) =>
                verification.id === id
                    ? { ...verification, status: "Completed" }
                    : verification
            )
        );
    };

    const handleDeny = (id: number) => {
        setVerifications((prevData) =>
            prevData.filter((verification) => verification.id !== id)
        );
    };

    return (
        <>
            {currentData.map((verification) => (
                <Card key={verification.id} className="mb-5">
                    <CardContent className="flex flex-col md:flex-row justify-between items-center p-4">
                        <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                                    <div className="text-sm text-gray-500 text-center sm:text-left">
                                        {new Date(
                                            verification.created_at
                                        ).toLocaleDateString()}
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded-md text-xs inline-block text-center ${
                                            verification.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : "bg-green-100 text-green-600"
                                        }`}
                                    >
                                        {verification.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:mt-0 mt-3">
                            <div className="flex space-x-10">
                                <button
                                    onClick={() =>
                                        handleAccept(verification.id)
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
                                    onClick={() => handleDeny(verification.id)}
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
