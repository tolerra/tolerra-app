"use client";

import { useState } from "react";
import PaginationClient from "@/components/pagination-client";
import Thread from "@/components/thread/thread";

const ITEMS_PER_PAGE = 4;

const threadData = [
  {
    title: "Best Approaches to Color Grading in Photoshop for a Cinematic Look?",
    date: "12 Sept 2023",
    description: "I've been experimenting with color grading in Photoshop to ...",
  },
  {
    title: "How to Create Responsive Websites?",
    date: "8 Aug 2023",
    description: "I am looking for best practices on making websites responsive ...",
  },
  {
    title: "What are the Latest Trends in UX Design?",
    date: "22 July 2023",
    description: "I have been researching modern trends in user experience design ...",
  },
  {
    title: "Best Tools for Remote Team Collaboration?",
    date: "15 June 2023",
    description: "Our team works remotely, and we want to improve our collaboration ...",
  },
  {
    title: "How to Improve SEO for a Blog?",
    date: "2 May 2023",
    description: "I want to learn effective techniques to improve SEO for my blog ...",
  },
  {
    title: "Is TypeScript Worth Learning in 2023?",
    date: "17 April 2023",
    description: "With the rise of JavaScript frameworks, is TypeScript still relevant?",
  },
];

export default function ThreadList() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalThreads = threadData.length;
  const lastPage = Math.ceil(totalThreads / ITEMS_PER_PAGE);

  const paginatedThreads = threadData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
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

      <PaginationClient
        current_page={currentPage}
        last_page={lastPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
