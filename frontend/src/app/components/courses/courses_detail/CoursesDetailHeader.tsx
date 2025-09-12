// app/components/courses_detail/CoursesDetailHeader.tsx
import React from "react";
import Link from "next/link";
import { CoursesTopic } from "@/app/types/coursesType";

interface CoursesDetailHeaderProps {
  topic: CoursesTopic | null;
}

/** Shows the course topic header or a fallback if no topic is selected */
const CoursesDetailHeader = ({ topic }: CoursesDetailHeaderProps) => {
  // Fallback message when no topic is selected
  if (!topic) {
    return (
      <div className="mb-8" dir="rtl">
        <h1 className="text-2xl font-bold text-hoboc mt-2">
          هیچ موضوعی انتخاب نشده است
        </h1>
      </div>
    );
  }

  // Main header linked to the topic page
  return (
    <div className="mb-8" dir="rtl">
      <Link
        href={`/courses/${topic.slug}`}
        className="text-2xl text-hoboc font-bold mt-2 hover:text-hoboc-dark transition-colors"
        aria-label={`رفتن به صفحه موضوع ${topic.title}`}
      >
        {topic.catchy_title}
      </Link>

      {/* Optional topic description (currently unused) */}
      {/* <p className="text-md opacity-80 mt-2">{topic.description}</p> */}
    </div>
  );
};

export default CoursesDetailHeader;
