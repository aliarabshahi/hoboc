import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { BlogTopic } from "@/app/types/blogType";

interface BlogNavigationBarProps {
  topic: BlogTopic;
  postTitle: string;
}

// Breadcrumb-style navigation bar for blog post pages (RTL layout)
export default function BlogNavigationBar({ topic, postTitle }: BlogNavigationBarProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className="bg-transparent backdrop-blur-sm border-b border-gray-200 py-3 mb-6"
      dir="rtl"
    >
      <ol className="flex items-center gap-1 text-sm select-none">
        {/* === Root link to the main blog page === */}
        <li>
          <Link
            href="/blog"
            className="hover:text-hoboc font-medium transition-colors duration-200 text-gray-500"
          >
            بلاگ
          </Link>
        </li>

        {/* === Link to the topic’s blog listing page === */}
        <li className="flex items-center">
          {/* Chevron icon separator */}
          <FaChevronLeft className="w-3 h-3 mx-1 text-gray-400" />
          <Link
            href={`/blog/${topic.slug}`}
            className="hover:text-hoboc-dark transition-colors duration-200 font-semibold text-gray-700"
          >
            {topic.title}
          </Link>
        </li>

        {/* === Current post title (active breadcrumb item) === */}
        <li className="flex items-center">
          {/* Chevron icon separator */}
          <FaChevronLeft className="w-3 h-3 mx-1 text-gray-400" />
          <span
            title={postTitle} // Shows full title on hover for truncated text
            className="truncate max-w-[200px] font-bold text-hoboc-dark"
          >
            {postTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}
