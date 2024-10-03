"use client";

import { useEffect, useState } from 'react';
import { getNotifications } from '@/app/actions/student/notification-action'; // Import API call
import { getUserId } from '@/app/actions/auth/auth-action'; // Import getUserId
import { Notification } from '@/app/type';

export default function NotificationDetailClient() {
    const [notification, setNotification] = useState<Notification | null>(null);

    useEffect(() => {
        const fetchNotification = async () => {
            const id = window.location.pathname.split("/").pop();
            if (id) {
                const userId = await getUserId(); // Fetch user ID
                if (userId) {
                    const notifications = await getNotifications(userId); // Fetch notifications using userId
                    const foundNotification = notifications.find((n: Notification) => n.id === parseInt(id, 10));
                    setNotification(foundNotification || null);
                }
            }
        };

        fetchNotification();

        const id = window.location.pathname.split("/").pop();
        if (id) {
            const openedNotifications = JSON.parse(localStorage.getItem('openedNotifications') || '[]');
            if (!openedNotifications.includes(parseInt(id, 10))) {
                openedNotifications.push(parseInt(id, 10));
                localStorage.setItem(
                    "openedNotifications",
                    JSON.stringify(openedNotifications)
                );
            }
        }
    }, []);

    if (!notification) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center mt-20 p-8">
            <div className="w-full max-w-2xl p-6 border border-gray-200 rounded-lg text-center">
                <h2 className="text-xl font-bold mb-8 text-center">{notification.event_type}</h2>
                <p className="mb-4 text-sm text-start">{notification.msg}</p>
                <div className="flex justify-between w-full mt-6">
                    <p className="text-sm text-gray-500">{notification.created_at}</p>
                    <p className="text-sm text-gray-500">Viewed</p>
                </div>
            </div>
        </div>
    );
}
