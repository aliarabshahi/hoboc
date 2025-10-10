"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { CoursesTopic } from "@/app/types/coursesType";

import CourseHeader from "./components/CourseHeader";
import CourseTopicsFilter from "./components/CourseTopicsFilter";
import CourseList from "./components/main-page/CourseList";

function CoursesPageInner() {
  const [topics, setTopics] = useState<CoursesTopic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const searchParams = useSearchParams();
  const selectedTopicSlug = searchParams.get("topic") || undefined;

  const selectedTopic = topics.find((t) => t.slug === selectedTopicSlug);
  const title = selectedTopic
    ? `دوره آموزشی ${selectedTopic.title || ""}`
    : "دوره‌های آموزشی";
  const description =
    "آموزش خودمونی مهندسی داده، هوش مصنوعی و تحلیل داده؛ پیاده‌سازی پایپ‌لاین‌های داده به زبان ساده";

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
    <main className="min-h-screen pb-16 bg-[#fffbfd]">
      <CourseHeader title={title} description={description} />

      <section className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-10" dir="rtl">
        {loadingTopics ? (
          <div className="h-8 w-40 bg-[#E9D7EB]/30 rounded-md animate-pulse mx-auto" />
        ) : (
          <CourseTopicsFilter topics={topics} selectedTopicSlug={selectedTopicSlug} />
        )}
      </section>

      <section className="relative container mx-auto px-4 md:px-8 lg:px-20 mt-8" dir="rtl">
        <CourseList selectedTopicSlug={selectedTopicSlug} pageSize={9} />
      </section>
    </main>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <CoursesPageInner />
    </Suspense>
  );
}
