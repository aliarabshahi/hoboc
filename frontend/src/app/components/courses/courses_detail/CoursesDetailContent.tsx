// app/components/courses_detail/CoursesDetailContent.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import { fetchApiData } from "@/app/services/receive_data/apiClientAxios";
import { useTopicStore } from "@/app/stores/topicStore";

/** Shortens text descriptions without breaking mid‑word */
function truncateDescription(text: string, maxLength = 150): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  const slice = text.slice(0, maxLength);
  const lastSpaceIndex = slice.lastIndexOf(" ");
  return lastSpaceIndex === -1
    ? `${slice}...`
    : `${slice.slice(0, lastSpaceIndex)}...`;
}

/** Renders the lesson list for the active course topic */
const CoursesDetailContent = ({ course }: { course: any }) => {
  const activeTopic = useTopicStore((state) => state.activeTopic);
  const [lessons, setLessons] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch lessons for the currently active topic
  useEffect(() => {
    const fetchLessons = async () => {
      setError(null);
      try {
        const params = activeTopic
          ? { "topic-slug": activeTopic.slug }
          : undefined;
        const data = await fetchApiData<any>("course-lessons", params);
        setLessons(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };
    fetchLessons();
  }, [activeTopic?.slug]);

  if (error) return <div className="alert alert-error">{error}</div>;
  if (!lessons.length) return null;

  return (
    <div className="lg:w-2/3 mx-auto" dir="rtl">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100   min-h-[200px]">
        {/* Section heading */}
        <h2 className="text-xl font-bold mb-6 flex items-center ">
          <BsBook className="w-6 h-6 ml-2" />
          محتوای دوره
        </h2>

        {/* Scrollable lesson list */}
        <div className="overflow-y-auto max-h-[300px] pl-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100  ">
          <div className="space-y-2">
            {lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/courses/${activeTopic?.slug}/lesson/${lesson.slug}`}
                className="group block rounded-md p-3 transition-colors duration-200 cursor-pointer bg-base-100  hover:bg-gray-50  border-0"
                aria-label={`رفتن به درس ${lesson.title}`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {/* Lesson index badge */}
                    <div
                      className={`min-w-7 min-h-7 w-7 h-7 aspect-square rounded-full flex items-center justify-center text-sm font-semibold select-none
                        ${
                          lesson.is_free
                            ? "bg-green-200 text-green-800 group-hover:bg-green-300"
                            : "bg-hoboc text-white group-hover:bg-hoboc-dark"
                        }`}
                      aria-hidden="true"
                    >
                      {index + 1}
                    </div>
                    {/* Lesson title and description */}
                    <div className="text-right max-w-xs">
                      <h3 className="text-sm font-semibold text-gray-900  group-hover:text-hoboc transition-colors truncate">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-500  mt-0.5">
                        {truncateDescription(lesson.description, 100)}
                      </p>
                    </div>
                  </div>

                  {/* Lesson metadata: duration & free tag */}
                  <div className="flex items-center gap-3 text-gray-400 text-xs select-none">
                    <span className="whitespace-nowrap pr-2">
                      {lesson.duration} دقیقه
                    </span>
                    {lesson.is_free && (
                      <span className="bg-green-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full select-none">
                        رایگان
                      </span>
                    )}
                    <FaChevronLeft className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesDetailContent;
