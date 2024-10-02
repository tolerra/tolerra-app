import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

interface CourseItemProps {
    id: number;
    title: string;
    instructor: string;
    rating: number;
    imageUrl: string;
    isLowVisionFriendly: boolean;
}

export default function CourseItem({
    id,
    title,
    instructor,
    rating,
    imageUrl,
    isLowVisionFriendly,
}: CourseItemProps) {
    return (
        <Link href={`/course-detail/${id}`} passHref>
            <Card>
                <CardContent className="my-auto">
                    <img
                        src={imageUrl}
                        alt={`${title} thumbnail`}
                        className="w-full object-cover rounded-md mt-7"
                    />
                    <div className="mt-7">
                        <h2 className="text-[16px] font-semibold mb-2">
                            {title}
                        </h2>
                        <p className="text-[14px] text-gray-600 mb-2">
                            {instructor}
                        </p>
                        <div className="flex items-center mb-2">
                            <span className="text-[14px] mr-1">{rating}</span>
                            <div className="flex">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill={
                                            index + 1 <= Math.round(rating)
                                                ? "currentColor"
                                                : "none"
                                        }
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-[14px] h-[14px] text-yellow-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                        />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        {isLowVisionFriendly && (
                            <div className="flex items-center space-x-1">
                                <p className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded flex justify-evenly gap-2">
                                    <Image
                                        src="/assets/student/eye.svg"
                                        alt="Low Vision Friendly"
                                        width={6.2}
                                        height={3.46}
                                    />
                                    Low Vision Friendly
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
