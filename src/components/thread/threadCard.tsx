import { Thread } from "@/app/type";
import Link from "next/link";

export default function ThreadCard({ id, content, created_at }: Thread) {
    const date = new Date(created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <Link href={`/thread/${id}`} className="truncate block">
            <div className="p-4 border rounded-md">
                <h3 className="text-lg font-semibold text-[#31406f] truncate">
                    <div className="truncate block">Thread #{id}</div>
                </h3>
                <p className="text-sm text-gray-500">{date}</p>
                <p className="text-sm text-gray-700 truncate">{content}</p>
            </div>
        </Link>
    );
}
