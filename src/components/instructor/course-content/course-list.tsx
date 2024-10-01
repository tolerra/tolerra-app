import CourseCard from "@/components/instructor/course-content/course-card";
import { CourseDialog } from "@/components/instructor/hooks/use-dashboard-manager";

interface CourseListProps {
    courses: CourseDialog[];
    onEdit: (course: CourseDialog) => void;
    onDelete: (course: CourseDialog) => void;
}

export default function CourseList({
    courses,
    onEdit,
    onDelete,
}: CourseListProps) {
    return (
        <div className="grid gap-4">
            {courses.map((course) => (
                <CourseCard
                    key={course.id}
                    course={course}
                    onEdit={() => onEdit(course)}
                    onDelete={() => onDelete(course)}
                />
            ))}
        </div>
    );
}
