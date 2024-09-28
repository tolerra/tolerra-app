export const dynamic = "force-dynamic";
import SearchBar from "@/components/explore/search-bar";
import ExploreContent from "@/components/explore/explore-content";
import FilterAccordion from "@/components/explore/filter-accordion";
import ResultFor from "@/components/explore/results-for";

export interface ExploreProps {
  searchParams?: {
    name?: string;
    page?: string;
    category_id?: string;
    min_rating?: string;
    difficulty?: string;
  };
}

export default async function Explore({ searchParams }: ExploreProps) {
  const uniqueCategory = {
    data: {
      categories: [
        { id: 1, name: "Development" },
        { id: 2, name: "Business" },
        { id: 3, name: "Design" },
        { id: 4, name: "Marketing" },
      ],
    },
  };

  const data = uniqueCategory.data;

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen w-full pt-8 pb-8">
      <div className="w-full max-w-6xl px-4 py-4">
        <SearchBar />
      </div>

      <div className="w-full max-w-6xl px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="md:sticky md:top-4">
            <ResultFor />
            <FilterAccordion categories={data.categories} />
          </div>
        </div>

        <div className="md:col-span-3">
          <ExploreContent courseSearchParams={searchParams} />
        </div>
      </div>
    </div>
  );
}
