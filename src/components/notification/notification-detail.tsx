'use client';

import { useEffect, useState } from 'react';
import { notifications } from '@/components/notification/notification-list';

interface Notification {
    id: number;
    type: string;
    template: string;
    userName?: string;
    courseName?: string;
    chapterName?: string;
    time: string;
}

export default function NotificationDetailClient() {
    const [notification, setNotification] = useState<Notification | null>(null);

    useEffect(() => {
        const id = window.location.pathname.split("/").pop();
        if (id) {
            const foundNotification = notifications.find((n) => n.id === parseInt(id, 10));
            setNotification(foundNotification || null);

            const openedNotifications = JSON.parse(localStorage.getItem('openedNotifications') || '[]');
            if (!openedNotifications.includes(parseInt(id, 10))) {
                openedNotifications.push(parseInt(id, 10));
                localStorage.setItem('openedNotifications', JSON.stringify(openedNotifications));
            }
        }
    }, []);

    if (!notification) {
        return <div>Loading...</div>;
    }

    const formattedTemplate = notification.template
        .replace("[User Name]", notification.userName || "")
        .replace("[Course Name]", notification.courseName || "")
        .replace("[Chapter Name]", notification.chapterName || "");

    return (
        <div className="flex flex-col items-center justify-center mt-20 p-8">
            <div className="w-full max-w-2xl p-6 border border-gray-200 rounded-lg text-center">
                <h2 className="text-xl font-bold mb-8 text-center">{notification.type}</h2>
                <p className="mb-4 text-sm text-start">{formattedTemplate}</p>
                <div className="flex justify-between w-full mt-6">
                <p className="text-sm text-gray-500">{notification.time}</p>
                <p className="text-sm text-gray-500">Viewed</p>
                </div>
            </div>
        </div>
    );
}
