import Image from "next/image";
export default function Home() {
    return (
        <section id="hero" className="h-screen flex items-center">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="text-start item">
                        <h2 className="text-4xl font-bold text-gray-600 mb-8">
                            Empowering Abilities,
                            <br />
                            <span className="text-primary">
                                Unlocking Potential
                            </span>
                        </h2>
                        <p className="text-lg mb-8">
                            Platform kami didedikasikan untuk memberdayakan
                            individu penyandang disabilitas, menawarkan kursus
                            dan komunitas yang dapat diakses untuk mendukung
                            pertumbuhan pribadi, pengembangan keterampilan, dan
                            kesuksesan karier.
                        </p>
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
    );
}
