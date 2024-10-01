import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CourseDialog } from "@/components/instructor/hooks/use-dashboard-manager";

interface CourseCardProps {
    course: CourseDialog;
    onEdit: () => void;
    onDelete: () => void;
}

export default function CourseCard({
    course,
    onEdit,
    onDelete,
}: CourseCardProps) {
    return (
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-lg">
            <Image
                src={course.image || "/path-to-default-image.jpg"}
                alt={course.title}
                width={100}
                height={60}
            />
            <div className="flex-grow text-center md:text-left ml-2">
                <h2 className="font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-600">{course.description}</p>
                {course.difficulty && (
                    <p className="text-sm text-gray-500">
                        Difficulty: {course.difficulty}
                    </p>
                )}
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-4 md:mt-0 justify-center">
                <Button
                    variant="outline"
                    className="w-full md:w-auto"
                    onClick={onEdit}
                >
                    Edit
                </Button>
                <Button
                    variant="destructive"
                    className="w-full md:w-auto"
                    onClick={onDelete}
                >
                    Hapus
                </Button>
            </div>
        </div>
    );
}
