"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Account } from "@/components/admin/hooks/use-dashboard-manager";
import { useState } from "react";

interface AccountListProps {
    accounts: Account[];
    itemsPerPage: number;
    onAccept: (id: number) => void;
    onDeny: (id: number) => void;
}

export default function AccountList({
    accounts,
    itemsPerPage,
    onAccept,
    onDeny,
}: AccountListProps) {
    const [accountPage, setAccountPage] = useState(1);
    const totalAccountPages = Math.ceil(accounts.length / itemsPerPage);
    const currentAccounts = accounts.slice(
        (accountPage - 1) * itemsPerPage,
        accountPage * itemsPerPage
    );

    return (
        <div>
            {currentAccounts.map((account) => (
                <Card key={account.id} className="mb-5">
                    <CardContent className="flex flex-col md:flex-row justify-between items-center p-4">
                        <div className="text-lg font-semibold">
                            {account.name}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center space-x-2">
                            <div className="text-sm text-gray-500">
                                {account.date}
                            </div>
                            <span
                                className={`px-2 py-1 rounded-md text-xs ${account.status === "Pending" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}
                            >
                                {account.status}
                            </span>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => onAccept(account.id)}>
                                Accept
                            </button>
                            <button onClick={() => onDeny(account.id)}>
                                Deny
                            </button>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <Pagination className="mt-5">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={
                                accountPage > 1
                                    ? () => setAccountPage(accountPage - 1)
                                    : undefined
                            }
                            className={
                                accountPage === 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }
                        />
                    </PaginationItem>
                    {Array.from({ length: totalAccountPages }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={accountPage === i + 1}
                                onClick={() => setAccountPage(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={
                                accountPage < totalAccountPages
                                    ? () => setAccountPage(accountPage + 1)
                                    : undefined
                            }
                            className={
                                accountPage === totalAccountPages
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
