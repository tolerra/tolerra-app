"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FaStar } from "react-icons/fa";

interface FilterAccordionProps {
  categories: {
    name: string;
  }[];
}

const ratings = [1, 2, 3, 4, 5];

export default function FilterAccordion({ categories }: FilterAccordionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addToUrl = (arr: Array<string | number>, param: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(param, arr.join(','));
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedRatings([]);
    setSelectedCategories([]);
    router.push(window.location.pathname);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prevSelectedRatings) => {
      if (prevSelectedRatings.includes(rating)) {
        const newRatings = prevSelectedRatings.filter((r) => r !== rating);
        addToUrl(newRatings, "min_rating");
        return newRatings;
      } else {
        const newRatings = [...prevSelectedRatings, rating];
        addToUrl(newRatings, "min_rating");
        return newRatings;
      }
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        const newCategories = prevSelectedCategories.filter((c) => c !== category);
        addToUrl(newCategories, "category"); // Use category name
        return newCategories;
      } else {
        const newCategories = [...prevSelectedCategories, category];
        addToUrl(newCategories, "category"); // Use category name
        return newCategories;
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-8 mb-4">
        <h2 className="font-bold text-primary">Filter by</h2>
        <button
          onClick={clearFilters}
          className="text-primary font-semibold transition-all hover:opacity-75 ml-4"
        >
          Clear Filters
        </button>
      </div>

      <Accordion
        type="multiple"
        className="transition-all duration-500 ease-in-out"
        defaultValue={[]}
      >
        <AccordionItem value="min_rating">
          <AccordionTrigger>Minimum Rating</AccordionTrigger>
          <AccordionContent>
            {ratings.map((rating) => (
              <div className="flex items-center space-x-2 mb-2" key={rating}>
                <Checkbox
                  id={`min_rating-${rating}`}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={() => handleRatingChange(rating)}
                />
                <Label htmlFor={`min_rating-${rating}`} className="flex items-center">
                  {Array.from({ length: rating }, (_, index) => (
                    <FaStar key={index} className="text-yellow-500" />
                  ))}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            {categories.map((category) => (
              <div className="flex items-center space-x-2 mb-2" key={category.name}>
                <Checkbox
                  id={`category-${category.name}`}
                  checked={selectedCategories.includes(category.name)}
                  onCheckedChange={() => handleCategoryChange(category.name)}
                />
                <Label htmlFor={`category-${category.name}`} className="capitalize">
                  {category.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
