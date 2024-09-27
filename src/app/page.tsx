import Image from "next/image";
import CourseCard from "@/components/course-card";
import { Button } from "@/components/ui/button";
import ReviewCard from "@/components/review-card";

const tempCourse = {
    id: 1,
    name: "Introduction to JavaScript",
    instructor_name: "John Doe",
    price: 49.99,
    image: "/assets/homepage/temp-course-adobe.png",
    average_rating: 4.5,
    isDashboard: false,
};

const tempReview = {
    id: 1,
    student_name: "Sarah F.",
    review: "Kursus ini benar-benar mengubah karier saya! Proyek langsung dan contoh nyata membuat konsepnya mudah dipahami. ",
    course_name: "Adobe Photoshop: A Comprehensive Guide",
};
export default function Home() {
    return (
        <main>
            <section
                id="hero"
                className="min-h-screen md:min-h-[70vh] flex items-center"
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
            <section className="max-w-screen-lg mx-auto text-center py-44 md:px-0 px-5">
                <h2 className="text-3xl font-semibold">
                    Kursus yang Disesuaikan untuk Anda
                </h2>
                <h4 className="text-lg mt-3">
                    Jelajahi Kusus yang dirancang untuk ramah disabilitas
                </h4>
                <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-5 mt-5">
                    <CourseCard
                        key={tempCourse.id}
                        id={tempCourse.id}
                        name={tempCourse.name}
                        instructor_name={tempCourse.instructor_name}
                        price={tempCourse.price}
                        image={tempCourse.image}
                        average_rating={tempCourse.average_rating}
                        isDashboard={false}
                    />
                    <CourseCard
                        key={tempCourse.id}
                        id={tempCourse.id}
                        name={tempCourse.name}
                        instructor_name={tempCourse.instructor_name}
                        price={tempCourse.price}
                        image={tempCourse.image}
                        average_rating={tempCourse.average_rating}
                        isDashboard={false}
                    />
                    <CourseCard
                        key={tempCourse.id}
                        id={tempCourse.id}
                        name={tempCourse.name}
                        instructor_name={tempCourse.instructor_name}
                        price={tempCourse.price}
                        image={tempCourse.image}
                        average_rating={tempCourse.average_rating}
                        isDashboard={false}
                    />
                    <CourseCard
                        key={tempCourse.id}
                        id={tempCourse.id}
                        name={tempCourse.name}
                        instructor_name={tempCourse.instructor_name}
                        price={tempCourse.price}
                        image={tempCourse.image}
                        average_rating={tempCourse.average_rating}
                        isDashboard={false}
                    />
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
            <section className="max-w-screen-lg mx-auto text-center py-44 md:px-0 px-5">
                <h2 className="text-3xl font-semibold">
                    Bagaimana pelajar sepertimu mencapai tujuannya
                </h2>
                <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-5 mt-5">
                    <ReviewCard
                        id={tempReview.id}
                        student_name={tempReview.student_name}
                        course_name={tempReview.course_name}
                        review={tempReview.review}
                    />
                    <ReviewCard
                        id={tempReview.id}
                        student_name={tempReview.student_name}
                        course_name={tempReview.course_name}
                        review={tempReview.review}
                    />
                    <ReviewCard
                        id={tempReview.id}
                        student_name={tempReview.student_name}
                        course_name={tempReview.course_name}
                        review={tempReview.review}
                    />
                </div>
            </section>
        </main>
    );
}
