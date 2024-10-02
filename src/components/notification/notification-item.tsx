import Link from 'next/link';

interface NotificationItemProps {
    id: number;
    type: string;
    template: string;
    userName?: string;
    courseName?: string;
    chapterName?: string;
    time: string;
}

export default function NotificationItem({
    id,
    type,
    template,
    userName,
    courseName,
    chapterName,
    time,
}: NotificationItemProps) {
    const formattedTemplate = template
        .replace("[User Name]", userName || "")
        .replace("[Course Name]", courseName || "")
        .replace("[Chapter Name]", chapterName || "");

    return (
        <Link href={`/notification/${id}`} passHref>
            <div className="cursor-pointer grid grid-cols-[1fr_auto] gap-4 py-3 hover:bg-gray-100 rounded-md">
                <div className="text-xs md:text-sm line-clamp-2 overflow-hidden">
                    <span className="font-semibold text-[#31406f]">{type}: </span>
                    <span>{formattedTemplate}</span>
                </div>
                <div className="text-xs md:text-sm font-semibold text-black whitespace-nowrap">
                    {time}
                </div>
            </div>
        </Link>
    );
}
