// app/components/last-lessons/LatestLessons.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useLatestLessons from "./useLatestLessons";
import LatestLessonsCard from "./LatestLessonsCard";
import LatestLessonsSkeletonCard from "./LatestLessonsSkeletonCard";
import LatestLessonsArrowButton, {
  LatestLessonsSkeletonArrowButton,
} from "./LatestLessonsArrowButton";

/** Section displaying a small carousel of the latest lessons */
export default function LatestLessons() {
  const { lessons, loading } = useLatestLessons(6);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show next 3 lessons, wrap to start when reaching end
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 >= lessons.length ? 0 : prev + 3));
  };

  // Show previous 3 lessons, wrap to end when reaching start
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 3 < 0 ? lessons.length - (lessons.length % 3 || 3) : prev - 3
    );
  };

  // Pick lessons to display (or skeletons while loading)
  const visibleLessons = loading
    ? Array(3).fill(null)
    : lessons.slice(currentIndex, currentIndex + 3);

  return (
    <div className="w-full mt-16">
      {/* Header with section title and "view all" button */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h2 className="text-xl md:text-2xl font-bold text-hoboc-dark">
          جدیدترین درس ها
        </h2>
        <Link href="/courses" passHref>
          <button className="button button--gray mr-auto text-white text-base font-medium px-4 py-2 rounded bg-gray-800 hover:bg-hoboc-dark transition">
            مشاهده همه
          </button>
        </Link>
      </div>

      {/* Lessons grid */}
      <div className="grid gap-6 md:grid-cols-3 relative z-10 lg:pr-10">
        {visibleLessons.map((lesson, idx) => (
          <div key={lesson?.id || idx}>
            {!lesson ? (
              <LatestLessonsSkeletonCard />
            ) : (
              <LatestLessonsCard lesson={lesson} />
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-center gap-8 mt-8 relative z-10 lg:pr-10">
        {loading ? (
          <>
            <LatestLessonsSkeletonArrowButton />
            <LatestLessonsSkeletonArrowButton />
          </>
        ) : lessons.length > 3 ? (
          <>
            <LatestLessonsArrowButton
              onClick={prevSlide}
              icon={<ChevronRight size={24} />}
              ariaLabel="Previous lessons"
            />
            <LatestLessonsArrowButton
              onClick={nextSlide}
              icon={<ChevronLeft size={24} />}
              ariaLabel="Next lessons"
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
