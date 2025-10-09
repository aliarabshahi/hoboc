"use client";

import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { BlogTopic } from "@/app/types/blogType";

import BlogHeader from "./components/BlogHeader";
import BlogTopicsDropdown from "./components/BlogTopicsDropdown";
import BlogList from "./components/main-page/BlogList";

export default function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const selectedTopicSlug = searchParams.topic;
  const [topics, setTopics] = useState<BlogTopic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);

  // Fetch list of blog topics on first render
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await getApiData("/blog-topics/?page_size=30");
        const fetched: BlogTopic[] = Array.isArray(res.data)
          ? res.data
          : res.data?.results || [];
        setTopics(fetched);
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchTopics();
  }, []);

  // Identify the currently selected topic from the fetched list
  const selectedTopic = topics.find((t) => t.slug === selectedTopicSlug);

  // Build page title based on selected topic (fallback to general blog title)
  const title = selectedTopic
    ? `مطالب بلاگ ${selectedTopic.title || selectedTopic.title || ""}`
    : "مطالب بلاگ";

  // Blog description (Persian UI text preserved)
const description = 
  "بلاگ تخصصی مهندسی داده و هوش مصنوعی. مقالات آموزشی به زبان ساده و خودمونی";

  return (
    <main className="min-h-screen pb-16 bg-[#fffbfd] ">
      {/* Blog page header */}
      <BlogHeader title={title} description={description} />

      {/* Blog topic filter dropdown */}
      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-8 text-center"
        dir="rtl"
      >
        {loadingTopics ? (
          // Skeleton loader for topics dropdown
          <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse mx-auto" />
        ) : (
          <BlogTopicsDropdown
            topics={topics}
            selectedTopicSlug={selectedTopicSlug}
          />
        )}
      </section>

      {/* Blog list/grid */}
      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-10"
        dir="rtl"
      >
        <BlogList selectedTopicSlug={selectedTopicSlug} pageSize={9} />
      </section>
    </main>
  );
}
