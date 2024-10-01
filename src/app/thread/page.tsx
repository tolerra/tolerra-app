"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import PaginationClient from "@/components/pagination-client";
import Thread from "@/components/thread/thread";

const ITEMS_PER_PAGE = 4;

const threadData = [
  {
    title: "Best Approaches to Color Grading in Photoshop for a Cinematic Look?",
    date: "12 Sept 2023",
    description:
      "I've been experimenting with color grading in Photoshop to ...",
  },
  {
    title: "How to Create Responsive Websites?",
    date: "8 Aug 2023",
    description: "I am looking for best practices on making websites responsive ...",
  },
  {
    title: "What are the Latest Trends in UX Design?",
    date: "22 July 2023",
    description:
      "I have been researching modern trends in user experience design ...",
  },
  {
    title: "Best Tools for Remote Team Collaboration?",
    date: "15 June 2023",
    description:
      "Our team works remotely, and we want to improve our collaboration ...",
  },
  {
    title: "How to Improve SEO for a Blog?",
    date: "2 May 2023",
    description: "I want to learn effective techniques to improve SEO for my blog ...",
  },
  {
    title: "Is TypeScript Worth Learning in 2023?",
    date: "17 April 2023",
    description:
      "With the rise of JavaScript frameworks, is TypeScript still relevant?",
  },
];

export default function ThreadPage() {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  const totalThreads = threadData.length;
  const lastPage = Math.ceil(totalThreads / ITEMS_PER_PAGE);

  const paginatedThreads = threadData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-[85vh] flex flex-col justify-between">
      <main className="flex-grow flex flex-col justify-start items-center p-6 space-y-8 mt-12">
        <h1 className="text-3xl font-medium text-center">Discussions</h1>

        <div className="grid grid-cols-1 gap-4 w-full max-w-4xl">
          {paginatedThreads.length > 0 ? (
            paginatedThreads.map((thread, index) => (
              <Thread
                key={index}
                id={(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                title={thread.title}
                date={thread.date}
                description={thread.description}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No discussions available.</p>
          )}
        </div>
      </main>
      <div className="w-full max-w-4xl mx-auto mb-4">
          <PaginationClient current_page={currentPage} last_page={lastPage} />
        </div>
    </div>
  );
}
