import Image from "next/image";
import EnrollCourseDialog from "@/components/student/enroll-dialog";
import { getCourseData } from "@/app/actions/student/student-action";
import {
    isDisabilityValidated,
    isLoggedIn,
} from "@/app/actions/auth/auth-action";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { id: number } }) {
    const course = await getCourseData(params.id);
    const isSigned = await isLoggedIn();
    const isValidated = await isDisabilityValidated();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-5xl mx-auto overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 p-6">
                        <div className="mb-4">
                            <Image
                                src={"/assets/homepage/temp-course-adobe.png"}
                                alt=""
                                width={1600}
                                height={900}
                            />
                        </div>
                        <h1 className="text-2xl text-primary font-bold mb-2">
                            {course.name}
                        </h1>
                        <p className="text-sm text-muted-foreground mb-4">
                            {course.instructor_name}
                        </p>
                        <p className="text-sm mb-4">{course.brief}</p>
                        <div className="flex items-center mb-4 gap-2">
                            <span className="font-semibold">
                                {course.average_rating.toFixed(1)}
                            </span>
                            <span className="text-yellow-400">
                                {"★".repeat(Math.round(course.average_rating))}
                                {"☆".repeat(
                                    5 - Math.round(course.average_rating)
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="md:w-3/5 p-6 flex flex-col">
                        <h2 className="text-xl font-semibold mb-4">
                            Description
                        </h2>
                        <p className="text-gray-700 mb-8">
                            {course.description || "No description available."}
                        </p>

                        {isSigned ? (
                            isValidated ? (
                                <EnrollCourseDialog
                                    courseId={course.id}
                                    courseName={course.name}
                                />
                            ) : (
                                <>
                                    <Button disabled>
                                        Disability Card Under Review
                                    </Button>
                                </>
                            )
                        ) : (
                            <Link href="/auth/sign-in">
                                <Button variant="default">
                                    Sign In to Enroll
                                </Button>
                            </Link>
                        )}
                        {/*<EnrollCourseDialog*/}
                        {/*    courseId={course.id}*/}
                        {/*    courseName={course.name}*/}
                        {/*/>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}
