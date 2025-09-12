// app/components/latest-blogs/LatestBlogs.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useLatestBlogs from "./useLatestBlogs";
import LatestBlogsCard from "./LatestBlogsCard";
import LatestBlogsSkeletonCard from "./LatestBlogsSkeletonCard";
import LatestBlogsArrowButton, {
  LatestBlogsSkeletonArrowButton,
} from "./LatestBlogsArrowButton";

/** Section displaying a 3-item carousel of the latest blog posts */
export default function LatestBlogs() {
  const { posts, loading } = useLatestBlogs(6);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Go forward 3 posts, wrap to start when reaching the end
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 >= posts.length ? 0 : prev + 3));
  };

  // Go back 3 posts, wrap to end when going before start
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 3 < 0 ? posts.length - (posts.length % 3 || 3) : prev - 3
    );
  };

  // Slice posts to display (or show skeletons while loading)
  const visiblePosts = loading
    ? Array(3).fill(null)
    : posts.slice(currentIndex, currentIndex + 3);

  return (
    <div className="w-full mt-16">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h2 className="text-xl md:text-2xl font-bold text-hoboc-dark">
          آخرین مقالات
        </h2>
        <Link href="/blog">
          <button className="button button--gray text-white text-base font-medium px-4 py-2 rounded bg-gray-800 hover:bg-hoboc-dark transition">
            مشاهده همه
          </button>
        </Link>
      </div>

      {/* Blog cards grid */}
      <div className="grid gap-6 md:grid-cols-3 relative z-10 lg:pr-10">
        {visiblePosts.map((post, idx) => (
          <div key={post?.id || idx}>
            {!post ? <LatestBlogsSkeletonCard /> : <LatestBlogsCard post={post} />}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-center gap-8 mt-8 relative z-10 lg:pr-10">
        {loading ? (
          <>
            <LatestBlogsSkeletonArrowButton />
            <LatestBlogsSkeletonArrowButton />
          </>
        ) : posts.length > 3 ? (
          <>
            <LatestBlogsArrowButton
              onClick={prevSlide}
              icon={<ChevronRight size={24} />}
              ariaLabel="Previous blogs"
            />
            <LatestBlogsArrowButton
              onClick={nextSlide}
              icon={<ChevronLeft size={24} />}
              ariaLabel="Next blogs"
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
