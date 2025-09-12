"use client";

import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { CoursesLesson } from "@/app/types/coursesType";
import CourseCard from "../CourseCard";
import CourseListSkeletonCard from "./CourseListSkeletonCard";
import CoursePagination from "./CoursePagination";

/** Displays a paginated list of course lessons with optional topic filtering */
export default function CourseList({
  selectedTopicSlug,
  pageSize,
}: {
  selectedTopicSlug?: string;
  pageSize: number;
}) {
  const [lessons, setLessons] = useState<CoursesLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  /** Fetch lessons from API whenever topic changes */
  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        let res;
        if (selectedTopicSlug) {
          res = await getApiData(
            `/course-lessons/?topic-slug=${selectedTopicSlug}&ordering=created_at`
          );
        } else {
          res = await getApiData("/course-lessons/");
        }
        setLessons(
          Array.isArray(res.data) ? res.data : res.data?.results || []
        );
        setError(null);
      } catch {
        setError("خطا در دریافت اطلاعات"); // Persian UI text preserved
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [selectedTopicSlug]);

  // Reset pagination when topic changes
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTopicSlug]);

  const totalPages = Math.ceil(lessons.length / pageSize);
  const currentLessons = lessons.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  // Loading state - show placeholder skeleton cards
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(pageSize)].map((_, i) => (
          <CourseListSkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // Error state - show Persian error message
  if (error) {
    return <div className="text-red-500 text-center mt-16">{error}</div>;
  }

  // Empty state - show Persian message
  if (lessons.length === 0) {
    return (
      <div className="text-gray-500 text-center mt-10">درسی یافت نشد.</div>
    );
  }

  return (
    <>
      {/* Lesson cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentLessons.map((lesson, index) => (
          <CourseCard
            key={lesson.id}
            lesson={lesson}
            lessonNumber={currentPage * pageSize + index + 1}
            showLessonNumber={!!selectedTopicSlug}
          />
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <CoursePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => {
            if (currentPage > 0) {
              setCurrentPage((p) => p - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          onNext={() => {
            if (currentPage < totalPages - 1) {
              setCurrentPage((p) => p + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        />
      )}
    </>
  );
}
