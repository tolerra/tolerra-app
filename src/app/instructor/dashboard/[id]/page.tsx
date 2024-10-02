import CourseDetailManagement from "@/components/instructor/course-management/course-detail";

export default async function CourseDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const courseId = params.id;

    return (
        <div>
            <CourseDetailManagement courseId={courseId} />
        </div>
    );
}
