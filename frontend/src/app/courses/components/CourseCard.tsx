"use client";
import Link from "next/link";
import Image from "next/image";
import { FiBookOpen, FiClock } from "react-icons/fi";
import { CoursesLesson } from "@/app/types/coursesType";

export default function CourseCard({
  lesson,
  lessonNumber,
  showLessonNumber = false,
}: {
  lesson: CoursesLesson;
  lessonNumber?: number;
  showLessonNumber?: boolean;
}) {
  const getTopicSlug = (): string => {
    if (lesson.tags?.[0]?.slug) return lesson.tags[0].slug;
    if (lesson.topic && typeof lesson.topic !== "string")
      return lesson.topic.slug || "general";
    return "general";
  };

  const getTopicTitle = (): string => {
    return typeof lesson.topic === "string"
      ? lesson.topic
      : lesson.topic?.title || "بدون موضوع";
  };

  const formatDuration = (duration: number | null): string => {
    if (!duration) return "زمان نامشخص";
    return duration < 60
      ? `${duration} دقیقه`
      : `${Math.floor(duration / 60)} ساعت و ${duration % 60} دقیقه`;
  };

  return (
    <div className="group block bg-white p-5 rounded-xl shadow-sm border border-hoboc flex flex-col justify-between transition hover:shadow-md relative overflow-hidden">
      {lessonNumber && showLessonNumber && (
        <div className="absolute top-3 right-3 bg-hoboc text-white font-bold flex items-center justify-center rounded-xl shadow-md z-10 w-8 h-8 text-xs sm:text-sm border border-hoboc-dark/20 transition-all hover:bg-hoboc-dark">
          {lessonNumber}
        </div>
      )}

      <Link
        href={`/courses/${lesson.topic_slug}/lesson/${lesson.slug}`}
        className="h-36 sm:h-40 w-full mb-4 rounded-lg overflow-hidden block"
      >
        {lesson.thumbnail ? (
          <Image
            src={lesson.thumbnail}
            alt={lesson.title}
            className="object-cover w-full h-full"
            width={480}
            height={160}
            loading="lazy"
            unoptimized={lesson.thumbnail.startsWith("data:")}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs sm:text-sm">
            تصویری موجود نیست
          </div>
        )}
      </Link>

      <Link
        href={`/courses/${lesson.topic_slug}/lesson/${lesson.slug}`}
        className="text-base sm:text-lg font-bold text-gray-700 mb-0 line-clamp-2 hover:text-hoboc transition-colors"
      >
        {lesson.title}
      </Link>

      {lesson.description && (
        <p className="text-gray-500 text-xs sm:text-sm mb-3 mt-0 line-clamp-3 leading-6">
          {lesson.description}
        </p>
      )}

      <div className="flex justify-between items-center mt-auto mb-3 pt-1 text-[11px] sm:text-sm text-hoboc-dark">
        <Link
          href={`/courses/${lesson.topic_slug}`}
          className="flex items-center gap-1.5 sm:gap-2 hover:text-hoboc transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <FiBookOpen size={13} />
          <span>{getTopicTitle()}</span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <FiClock size={13} />
          <span>{formatDuration(lesson.duration)}</span>
        </div>
      </div>

      <Link
        href={`/courses/${lesson.topic_slug}/lesson/${lesson.slug}`}
        className="block w-full select-none text-center py-2.5 sm:py-3 rounded-xl font-semibold sm:font-bold
                   bg-white text-hoboc border border-hoboc
                   hover:bg-hoboc hover:text-white
                   transition-colors duration-200 shadow-sm text-xs sm:text-sm"
      >
        مشاهده درس
      </Link>
    </div>
  );
}
