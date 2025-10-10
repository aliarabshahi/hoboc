import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { CoursesTopic } from "@/app/types/coursesType";

interface CourseNavigationBarProps {
  topic: CoursesTopic;
}

/** Breadcrumb navigation for course topic pages (responsive typography) */
export default function CourseNavigationBar({ topic }: CourseNavigationBarProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className="bg-transparent backdrop-blur-sm border-b border-gray-200 py-3 mb-6"
      dir="rtl"
    >
      <ol className="flex items-center gap-1 text-[12px] sm:text-[13px] md:text-sm select-none">
        {/* Root link */}
        <li>
          <Link
            href="/courses"
            className="hover:text-hoboc font-medium transition-colors duration-200 text-gray-500"
          >
            دوره‌ها
          </Link>
        </li>

        {/* Current topic (non-clickable) */}
        <li className="flex items-center">
          <FaChevronLeft className="w-3 h-3 mx-1 text-gray-400" />
          <span
            title={topic.title}
            className="truncate max-w-[220px] font-bold text-hoboc-dark text-[12px] sm:text-[13px] md:text-sm"
          >
            {topic.title}
          </span>
        </li>
      </ol>
    </nav>
  );
}
