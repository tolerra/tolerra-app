import CourseList from "@/components/student/course-list";

export default function DashboardPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold my-6 flex justify-center">
                Kursus Terdaftar
            </h1>
            <CourseList />
        </div>
    );
}
