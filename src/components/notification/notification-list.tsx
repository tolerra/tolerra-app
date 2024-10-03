"use client";

import { useEffect, useState } from "react";
import NotificationItem from "@/components/notification/notification-item";
import PaginationClient from "@/components/pagination-client";
import { getNotifications } from "@/app/actions/student/notification-action";
import { getUserId } from "@/app/actions/auth/auth-action";
import { Notification } from "@/app/type";

const ITEMS_PER_PAGE = 5;

export default function NotificationList() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNotifications, setTotalNotifications] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const userId = await getUserId();
                if (userId) {
                    const notificationsData = await getNotifications(userId);
                    setNotifications(notificationsData);
                    setTotalNotifications(notificationsData.length);
                } else {
                    setError("User ID not found.");
                }
            } catch (err) {
                setError("Failed to fetch notifications.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const lastPage = Math.ceil(totalNotifications / ITEMS_PER_PAGE);

    const displayedNotifications = notifications.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) return <p>Loading notifications...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="grid grid-cols-1 gap-2 px-6 py-6">
            {displayedNotifications.length > 0 ? (
                displayedNotifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        id={notification.id}
                        type={notification.event_type}
                        template={notification.msg}
                        userName={
                            notification.user.name ||
                            notification.user.id.toString()
                        }
                        time={notification.created_at || "N/A"}
                    />
                ))
            ) : (
                <p>No notifications available</p>
            )}

            {totalNotifications > ITEMS_PER_PAGE && (
                <PaginationClient
                    current_page={currentPage}
                    last_page={lastPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
