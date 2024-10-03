"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { enrollCourse } from "@/app/actions/student/student-action";
import { useState } from "react";

interface EnrollCourseDialogProps {
    courseId: number;
    courseName: string;
}

export default function EnrollCourseDialog({
    courseId,
    courseName,
}: EnrollCourseDialogProps) {
    const router = useRouter();
    const [isEnrolling, setIsEnrolling] = useState(false);

    const handleEnroll = async () => {
        setIsEnrolling(true);
        try {
            const response = await enrollCourse(courseId);
            toast.success(response.message || "Enrolled successfully");
            router.push("/student/dashboard");
            router.refresh();
        } catch (error: unknown) {
            // Change 'any' to 'unknown'
            if (error instanceof Error) {
                toast.error(error.message);
                console.log("Error during enrollment:", error.message);
            } else {
                toast.error("An unexpected error occurred");
                console.log("Unexpected error:", error);
            }
        } finally {
            setIsEnrolling(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-1/4 px-6 py-3 mt-auto text-xl">
                    Enroll Now
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-primary font-bold text-2xl text-center">
                        Enrollment Confirmation
                    </DialogTitle>
                </DialogHeader>
                <div className="p-4">
                    <div className="flex justify-between mb-16">
                        <div>
                            <p className="text-gray-700">
                                Are you sure you want to enroll in the &quot;
                                {courseName}&quot; course?
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <Button onClick={handleEnroll} disabled={isEnrolling}>
                            {isEnrolling ? "Enrolling..." : "Commit Enrollment"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
