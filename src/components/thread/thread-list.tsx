"use client";

import { useState } from "react";
import PaginationClient from "@/components/pagination-client";
import ThreadCard from "@/components/thread/threadCard";
import { Thread } from "@/app/type";

const ITEMS_PER_PAGE = 4;

interface ThreadListProps {
    initialThreads: Thread[];
}

export default function ThreadList({ initialThreads }: ThreadListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalThreads = initialThreads.length;
    const lastPage = Math.ceil(totalThreads / ITEMS_PER_PAGE);

    const paginatedThreads = initialThreads.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="grid grid-cols-1 gap-4 w-full max-w-4xl">
            {paginatedThreads.length > 0 ? (
                paginatedThreads.map((thread) => (
                    <ThreadCard
                        key={thread.id}
                        id={thread.id}
                        title={thread.title}
                        category_id={thread.category_id}
                        user_id={thread.user_id}
                        content={thread.content}
                        created_at={thread.created_at}
                    />
                ))
            ) : (
                <p className="text-center text-gray-500">
                    No discussions available.
                </p>
            )}

            <PaginationClient
                current_page={currentPage}
                last_page={lastPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
