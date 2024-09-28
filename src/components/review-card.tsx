import Image from "next/image";

interface reviewCardProps {
    id: number;
    student_name: string;
    course_name: string;
    review: string;
}

export default function ReviewCard({
    id,
    student_name,
    course_name,
    review,
}: reviewCardProps) {
    return (
        <div key={id} className="shadow-md p-2  max-w-xs">
            <div className="text-left grid mt-1 p-4">
                <p className="text-black text-sm py-1 mb-28">{review}</p>
                <p className="text-gray-500 text-sm italic pb-1">
                    -{student_name}
                </p>
                <hr className="my-2 border-gray-300" />
                <div className={`flex items-center space-x-2`}>
                    <Image
                        src={"/assets/homepage/mortarboard.png"}
                        alt={"Mortarboard Icon"}
                        width={30}
                        height={30}
                    />
                    <p className="font-semibold text-xs text-primary">
                        {course_name}
                    </p>
                </div>
            </div>
        </div>
    );
}
