// app/components/last-lessons/LatestLessonsCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { FiBookOpen, FiClock } from "react-icons/fi";
import { CoursesLesson, CoursesTopic } from "@/app/types/coursesType";

/** Card displaying a single lesson with thumbnail, title, metadata, and CTA */
export default function LatestLessonsCard({ lesson }: { lesson: CoursesLesson }) {
  const getTopicSlug = (lesson: CoursesLesson): string => {
    if (lesson.tags?.[0]?.slug) return lesson.tags[0].slug;
    if (
      lesson.topic &&
      typeof lesson.topic !== "string" &&
      (lesson.topic as CoursesTopic).slug
    ) {
      return (lesson.topic as CoursesTopic).slug;
    }
    return "general";
  };

  const getTopicTitle = (topic: string | CoursesTopic): string => {
    return typeof topic === "string" ? topic : topic?.title || "بدون موضوع";
  };

  const formatDuration = (duration: number | null): string => {
    if (!duration) return "زمان نامشخص";
    return duration < 60
      ? `${duration} دقیقه`
      : `${Math.floor(duration / 60)} ساعت و ${duration % 60} دقیقه`;
  };

  return (
    <Link
      href={`/courses/${lesson.topic_slug}/lesson/${lesson.slug}`}
      prefetch={false}
      className="group block bg-white p-5 rounded-xl shadow-sm border border-hoboc
                 flex flex-col justify-between transition hover:shadow-md 
                 relative overflow-hidden h-[418px] max-h-[418px]"
    >
      {/* Lesson thumbnail */}
      <div className="-mt-5 -mx-5 mb-4 h-40 overflow-hidden flex items-center justify-center rounded-t-xl bg-gray-100 dark:bg-gray-800 relative">
        {lesson.thumbnail ? (
          <>
            <Image
              src={lesson.thumbnail}
              alt={lesson.title}
              className="object-cover w-full h-full"
              width={400}
              height={160}
              loading="lazy"
              unoptimized={lesson.thumbnail.startsWith("data:")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none" />
          </>
        ) : (
          <span className="text-gray-400 text-sm z-10">تصویری موجود نیست</span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-700 mb-1 line-clamp-2">
        {lesson.title}
      </h3>

      {/* Short description */}
      {lesson.description && (
        <p className="text-gray-500 text-sm mb-3 mt-1 line-clamp-3 leading-6">
          {lesson.description}
        </p>
      )}

      {/* Metadata: topic + duration */}
      <div className="flex items-center justify-between text-sm text-hoboc-dark mt-auto mb-5 pt-3">
        <div className="flex items-center gap-2">
          <FiBookOpen size={14} />
          <span>{getTopicTitle(lesson.topic)}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiClock size={14} />
          <span>{formatDuration(lesson.duration)}</span>
        </div>
      </div>

      {/* Call-to-action */}
      <div className="mt-auto">
        <div
          className="block w-full text-center py-3 rounded-xl font-bold
                     bg-white text-hoboc border border-hoboc
                     group-hover:bg-hoboc group-hover:text-white
                     transition-colors duration-200 shadow-sm"
        >
          مشاهده درس
        </div>
      </div>
    </Link>
  );
}
