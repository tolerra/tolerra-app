import Image from "next/image";
import CourseCard from "@/components/course-card";
import { Button } from "@/components/ui/button";
import ReviewCard from "@/components/review-card";
import { Course } from "@/app/type";
import { getPopularReview, getTailoredCourse } from "@/app/actions/home-action";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default async function Home() {
    const popularReviews = await getPopularReview();
    const tailoredCourses = await getTailoredCourse();

    return (
        <main>
            <section
                id="hero"
                className="min-h-screen md:min-h-[70vh] flex items-center mb-6"
            >
                <div className="container mx-auto mt-16">
                    <div className="grid md:grid-cols-2 gap-12 h-full">
                        <div className="text-start item flex flex-col justify-center">
                            <h2 className="text-4xl font-bold text-gray-600 mb-8">
                                Empowering Abilities,
                                <br />
                                <span className="text-primary">
                                    Unlocking Potential
                                </span>
                            </h2>
                            <p className="text-lg mb-8">
                                Platform kami didedikasikan untuk memberdayakan
                                individu penyandang disabilitas, menawarkan
                                kursus dan komunitas yang dapat diakses untuk
                                mendukung pertumbuhan pribadi, pengembangan
                                keterampilan, dan kesuksesan karier.
                            </p>
                            <Button className="w-32">Jelajah Kursus</Button>
                        </div>

                        <div className="flex justify-center md:justify-end items-center h-full">
                            <Image
                                src="/assets/homepage/hero-section-svg.svg"
                                alt="Hero Illustration"
                                width={350}
                                height={350}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-screen-lg mx-auto text-center py-44 px-5">
                <h2 className="text-3xl font-semibold">
                    Kursus yang Disesuaikan untuk Anda
                </h2>
                <h4 className="text-lg mt-3 mb-8">
                    Jelajahi Kursus yang dirancang untuk ramah disabilitas
                </h4>

                <div className="md:hidden w-full flex justify-center">
                    {tailoredCourses.length > 0 ? (
                        <Carousel
                            opts={{
                                align: "center",
                            }}
                            className="w-full max-w-sm"
                        >
                            <CarouselContent>
                                {tailoredCourses.map((course: Course) => (
                                    <CarouselItem
                                        key={course.id}
                                        className="flex justify-center"
                                    >
                                        <div className="p-1 w-full max-w-[250px]">
                                            <CourseCard
                                                id={course.id}
                                                name={course.name}
                                                instructor_name={
                                                    course.instructor_name
                                                }
                                                average_rating={
                                                    course.average_rating
                                                }
                                                isDashboard={false}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="flex justify-center mt-4">
                                <CarouselPrevious />
                                <CarouselNext />
                            </div>
                        </Carousel>
                    ) : (
                        <p>No courses available</p>
                    )}
                </div>

                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                    {tailoredCourses.length > 0 ? (
                        tailoredCourses.map((course: Course) => (
                            <div
                                key={course.id}
                                className="w-full max-w-[250px] mx-auto"
                            >
                                <CourseCard
                                    id={course.id}
                                    name={course.name}
                                    instructor_name={course.instructor_name}
                                    average_rating={course.average_rating}
                                    isDashboard={false}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-4">
                            No courses available
                        </p>
                    )}
                </div>
            </section>

            <section id="instructor-form" className="py-12">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex justify-center md:justify-start items-center">
                            <Image
                                src="/assets/homepage/instructor-form-svg.svg"
                                width={450}
                                height={450}
                                alt="Instructor Illustration"
                                className="mx-auto md:mx-0"
                            />
                        </div>
                        <div className="text-center md:text-left flex flex-col justify-center">
                            <h2 className="text-3xl font-semibold mb-8">
                                Share Your Passion, Teach the World
                            </h2>
                            <p className="text-lg mb-8">
                                Bagikan keahlian Anda secara pro bono untuk
                                mendukung teman-teman disabilitas. Bergabunglah
                                dan ajarkan apa yang Anda sukai demi misi
                                sosial!
                            </p>
                            <Button className="w-36 mx-auto md:mx-0">
                                Mulai Sekarang
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-screen-lg mx-auto text-center py-44 px-5">
                <h2 className="text-2xl md:text-3xl font-semibold mb-8">
                    Bagaimana pelajar sepertimu mencapai tujuannya
                </h2>
                <div className="md:hidden w-full flex justify-center">
                    {popularReviews.length > 0 ? (
                        <Carousel
                            opts={{
                                align: "center",
                            }}
                            className="w-full max-w-sm"
                        >
                            <CarouselContent>
                                {popularReviews.map((review) => (
                                    <CarouselItem
                                        key={review.course_id}
                                        className="flex justify-center"
                                    >
                                        <div className="p-1">
                                            <ReviewCard
                                                id={review.course_id}
                                                student_name={
                                                    review.student.name
                                                }
                                                course_name={review.course.name}
                                                review={review.review}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="flex justify-center mt-4">
                                <CarouselPrevious />
                                <CarouselNext />
                            </div>
                        </Carousel>
                    ) : (
                        <p>No reviews available</p>
                    )}
                </div>
                <div className="hidden md:flex flex-col md:flex-row justify-center items-center md:items-stretch gap-5 mt-5">
                    {popularReviews.length > 0 ? (
                        popularReviews.map((review) => (
                            <ReviewCard
                                key={review.course_id}
                                id={review.course_id}
                                student_name={review.student.name}
                                course_name={review.course.name}
                                review={review.review}
                            />
                        ))
                    ) : (
                        <p>No reviews available</p>
                    )}
                </div>
            </section>
        </main>
    );
}
