"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { CoursesTopic } from "@/app/types/coursesType";

import CourseHeader from "./components/CourseHeader";
import CourseTopicsFilter from "./components/CourseTopicsFilter";
import CourseList from "./components/main-page/CourseList";

/** Inner content - wrapped in Suspense to avoid prerender build errors */
function CoursesPageInner() {
  const [topics, setTopics] = useState<CoursesTopic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const searchParams = useSearchParams();
  const selectedTopicSlug = searchParams.get("topic") || undefined;

  // Find the topic selected via query param
  const selectedTopic = topics.find((t) => t.slug === selectedTopicSlug);
  const title = selectedTopic
    ? `دوره آموزشی ${selectedTopic.title || selectedTopic.title || ""}`
    : "دوره‌های آموزشی";
const description = 
  "آموزش ساده مهندسی داده، هوش مصنوعی و تحلیل داده. پیاده سازی پایپ‌لاین‌های داده به زبان خودمونی";

  // Fetch course topics on mount
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await getApiData("/course-topics/");
        const data: CoursesTopic[] = Array.isArray(res.data)
          ? res.data
          : res.data?.results || [];
        setTopics(data);
      } finally {
        setLoadingTopics(false);
      }
    };
    fetchTopics();
  }, []);

  return (
    <main className="min-h-screen pb-16 bg-[#fffbfd] ">
      {/* Page header */}
      <CourseHeader title={title} description={description} />

      {/* Topics filter section */}
      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-10"
        dir="rtl"
      >
        {loadingTopics ? (
          // Skeleton loader while topics load
          <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse mx-auto" />
        ) : (
          <CourseTopicsFilter
            topics={topics}
            selectedTopicSlug={selectedTopicSlug}
          />
        )}
      </section>

      {/* Courses list and pagination */}
      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-8"
        dir="rtl"
      >
        <CourseList selectedTopicSlug={selectedTopicSlug} pageSize={9} />
      </section>
    </main>
  );
}

/** Courses main page - wraps content in Suspense to prevent build-time hook errors */
export default function CoursesPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <CoursesPageInner />
    </Suspense>
  );
}
