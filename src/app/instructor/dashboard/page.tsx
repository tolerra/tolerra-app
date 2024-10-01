import { Button } from "@/components/ui/button";
import Image from "next/image";
import AddCourseDialog from "@/components/instructor/add-course-dialog";
import EditCourseDialog from "@/components/instructor/edit-course-dialog";
import DeleteCourseDialog from "@/components/instructor/delete-course-dialog";
import useDashboardManager from "@/components/instructor/hooks/use-dashboard-manager";

export default function Dashboard() {
    const {
        courses,
        isAddDialogOpen,
        setIsAddDialogOpen,
        isEditDialogOpen,
        setIsEditDialogOpen,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        selectedCourse,
        setSelectedCourse,
        handleAddCourse,
        handleEditCourse,
        handleDeleteCourse,
    } = useDashboardManager();

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-end mb-5 mt-5">
                <Button onClick={() => setIsAddDialogOpen(true)}>Tambah</Button>
            </div>
            <div className="flex justify-center mb-6">
                <h1 className="text-2xl font-bold">Atur Kursusmu</h1>
            </div>

            <div className="grid gap-4">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-lg"
                    >
                        <Image
                            src={course.image || "/path-to-default-image.jpg"}
                            alt={course.title}
                            width={100}
                            height={60}
                        />

                        <div className="flex-grow text-center md:text-left ml-2">
                            <h2 className="font-semibold">{course.title}</h2>
                            <p className="text-sm text-gray-600">
                                {course.description}
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-4 md:mt-0 justify-center">
                            <Button
                                variant="outline"
                                className="w-full md:w-auto"
                                onClick={() => {
                                    setSelectedCourse(course);
                                    setIsEditDialogOpen(true);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                className="w-full md:w-auto"
                                onClick={() => {
                                    setSelectedCourse(course);
                                    setIsDeleteDialogOpen(true);
                                }}
                            >
                                Hapus
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <AddCourseDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                course={null}
                onAddCourse={handleAddCourse}
            />
            <EditCourseDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                course={selectedCourse}
                onEditCourse={handleEditCourse}
            />
            <DeleteCourseDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                course={selectedCourse}
                onDeleteCourse={handleDeleteCourse}
            />
        </div>
    );
}
