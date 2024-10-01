"use client";
import { useState, useEffect } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationClientProps {
    last_page: number;
    current_page: number;
    onPageChange: (page: number) => void;  // Include the onPageChange prop
}

export default function PaginationClient({
    last_page,
    current_page,
    onPageChange,  // Destructure onPageChange
}: PaginationClientProps) {
    const [page, setPage] = useState(current_page);

    useEffect(() => {
        setPage(current_page);
    }, [current_page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        onPageChange(newPage);  // Call the parent-provided handler
    };

    return (
        <Pagination className="mt-8">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={
                            page === 1
                                ? undefined
                                : () => handlePageChange(page - 1)
                        }
                        className={page === 1 ? "opacity-50 cursor-not-allowed" : ""}
                    />
                </PaginationItem>

                {Array.from({ length: last_page }, (_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            isActive={page === index + 1}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={
                            page === last_page
                                ? undefined
                                : () => handlePageChange(page + 1)
                        }
                        className={page === last_page ? "opacity-50 cursor-not-allowed" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
