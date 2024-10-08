import Link from "next/link";
import { useEffect, useState } from "react";

interface NotificationItemProps {
    id: number;
    type: string;
    template: string;
    userName?: string;
    time: string;
}

export default function NotificationItem({
    id,
    type,
    template,
    userName,
    time,
}: NotificationItemProps) {
    const formattedTemplate = template.replace("[User Name]", userName || "");

    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        const openedNotifications = JSON.parse(
            localStorage.getItem("openedNotifications") || "[]"
        );
        setIsOpened(openedNotifications.includes(id));
    }, [id]);

    const handleClick = () => {
        const openedNotifications = JSON.parse(
            localStorage.getItem("openedNotifications") || "[]"
        );
        if (!openedNotifications.includes(id)) {
            openedNotifications.push(id);
            localStorage.setItem(
                "openedNotifications",
                JSON.stringify(openedNotifications)
            );
        }
    };

    return (
        <Link href={`/notification/${id}`} passHref>
            <div
                onClick={handleClick}
                className={`cursor-pointer grid grid-cols-[1fr_auto] gap-4 py-3 hover:bg-gray-100 rounded-md ${isOpened ? "opacity-50" : ""}`}
            >
                <div className="text-xs md:text-sm line-clamp-2 overflow-hidden">
                    <span className="font-semibold text-[#31406f]">
                        {type}:{" "}
                    </span>
                    <span>{formattedTemplate}</span>
                </div>
                <div className="text-xs md:text-sm font-semibold text-black whitespace-nowrap">
                    {time}
                </div>
            </div>
        </Link>
    );
}
