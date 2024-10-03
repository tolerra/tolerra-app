import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
    id: number;
    name: string;
    instructor_name: string;
    average_rating: string;
    isDashboard: boolean;
}

export default function CourseCard({
    id,
    name,
    instructor_name,
    average_rating,
    isDashboard,
}: CourseCardProps) {
    const link = isDashboard ? `/courses/learn/${id}/1` : `/courses/${id}`;
    return (
        <Link href={link}>
            <div
                key={id}
                className="bg-white shadow-md p-2 transform transition duration-500 hover:bg-secondary hover:shadow-xl w-full max-w-xs"
            >
                <Image
                    src={"/assets/homepage/temp-course-adobe.png"}
                    alt={name}
                    width={300}
                    height={170}
                    className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="text-left grid mt-1 p-1">
                    <h5 className="text-md font-bold text-gray-800 truncate">
                        {name}
                    </h5>
                    <p className="text-muted-foreground text-xs py-1">
                        {instructor_name}
                    </p>
                    <p className="font-semibold text-sm pb-1">
                        {average_rating}
                    </p>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full w-max">
                        Low Vision Friendly
                    </span>
                    <p className="font-semibold text-sm"></p>
                </div>
            </div>
        </Link>
    );
}
