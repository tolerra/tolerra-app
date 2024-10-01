import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CourseDialogProps } from "@/components/instructor/add-course-dialog";

type DeleteCourseDialogProps = Pick<
    CourseDialogProps,
    "isOpen" | "onClose" | "course" | "onDeleteCourse"
>;

export default function DeleteCourseDialog({
    isOpen,
    onClose,
    course,
    onDeleteCourse,
}: DeleteCourseDialogProps) {
    const handleDelete = () => {
        if (course) {
            onDeleteCourse(course.id);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Course</DialogTitle>
                </DialogHeader>
                <p>
                    Are you sure you want to delete the course &quot
                    {course?.title}
                    &quot?
                </p>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
