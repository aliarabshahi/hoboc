// app/components/courses/CourseTopic.tsx
"use client";

import Image from "next/image";
import { CoursesTopic } from "@/app/types/coursesType";

type Props = {
  topic: CoursesTopic;
  isActive: boolean;
  onClick: () => void;
};

/** Single course topic tile with logo, title, and active state styling */
const CourseTopic = ({ topic, isActive, onClick }: Props) => {
  // Detect if logo is hosted locally to disable Next.js image optimization
  const isLocalhostImage = topic.image?.includes("localhost");

  return (
    <div
      className={`flex flex-col items-center justify-center text-center border-b-2 pb-2 transition-all duration-200 cursor-pointer ${
        isActive
          ? "opacity-100 border-gray-100"
          : "opacity-60 border-white hover:opacity-100 hover:border-gray-100"
      }`}
      onClick={onClick}
    >
      {/* Course topic logo */}
      <Image
        src={topic.logo_file}
        alt={topic.title}
        width={48}
        height={48}
        className="rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
        unoptimized={isLocalhostImage}
      />

      {/* Topic title (Persian) */}
      <span className="text-xs sm:text-sm md:text-base font-medium mt-1">
        {topic.title}
      </span>
    </div>
  );
};

export default CourseTopic;
