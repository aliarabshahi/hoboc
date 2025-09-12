"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { BlogTopic } from "@/app/types/blogType";

export default function BlogTopicsDropdown({
  topics,
  selectedTopicSlug,
}: {
  topics: BlogTopic[];
  selectedTopicSlug?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Update URL query to reflect selected topic
  const handleSelect = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    slug ? params.set("topic", slug) : params.delete("topic");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
        
        {/* "All Topics" button */}
        <button
          onClick={() => handleSelect("")}
          className={`px-4 py-2 rounded-full font-medium transition ${
            !selectedTopicSlug
              ? "bg-hoboc text-white"
              : "bg-gray-100 text-gray-700 hover:bg-hoboc hover:text-white"
          }`}
        >
          همه موضوعات
        </button>

        {/* Dynamic topic buttons */}
        {topics.map((topic) => {
          const isActive = topic.slug === selectedTopicSlug;
          return (
            <button
              key={topic.id}
              onClick={() => handleSelect(topic.slug)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                isActive
                  ? "bg-hoboc text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-hoboc hover:text-white"
              }`}
            >
              {topic.title}
            </button>
          );
        })}
      </div>
    </section>
  );
}
