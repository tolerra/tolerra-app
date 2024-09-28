import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function CourseCard({
  id,
  title,
  description,
  instructor,
  rating,
  imageSrc,
  isLowVisionFriendly,
}: {
  id: number;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  category: string;
  difficulty: string;
  imageSrc: string;
  isLowVisionFriendly: boolean;
}) {
  const roundedRating = Math.round(rating);

  return (
    <Link href={`/courses/${id}`} className="block w-full mb-6">
      <div className="grid grid-cols-6 gap-4 w-full bg-white border p-4 rounded-lg transform transition duration-500 hover:bg-gray-100">
        
        <div className="relative col-span-6 sm:col-span-2 h-32 sm:h-36">
          <Image
            src={imageSrc}
            alt={title}
            width={223}
            height={120}
            className="rounded-md object-cover w-full h-full"
          />
        </div>

        <div className="col-span-6 sm:col-span-4 p-2 flex flex-col justify-between">
          
          <div className="flex justify-between items-start sm:items-center">
            <h3 className="text-md font-bold text-gray-800">{title}</h3>
            
            <div className="hidden sm:flex items-center">
              <span className="text-yellow-400 mr-1">{rating.toFixed(1)}</span>
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={i < roundedRating ? "text-yellow-400" : "text-gray-300"}
                    size={16}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600 mb-1">
            {description.length > 80 ? `${description.slice(0, 80)}...` : description}
          </p>

          <p className="text-xs text-gray-500">{instructor}</p>

          {isLowVisionFriendly && (
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full w-max">
              Low Vision Friendly
            </span>
          )}

          <div className="sm:hidden flex items-center mt-2">
            <span className="text-yellow-400 mr-1">{rating.toFixed(1)}</span>
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={i < roundedRating ? "text-yellow-400" : "text-gray-300"}
                  size={16}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
