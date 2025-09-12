// app/components/latest-blogs/LatestBlogsCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/app/types/blogType";
import { FiCalendar, FiUser } from "react-icons/fi";

/** Card showing blog post with image, metadata, and title */
export default function LatestBlogsCard({ post }: { post: BlogPost }) {
  return (
    <article
      dir="rtl"
      className="relative isolate flex flex-col justify-end
                 overflow-hidden rounded-2xl bg-gray-900
                 px-6 pb-6 pt-64 sm:pt-48 lg:pt-64
                 shadow-lg hover:shadow-xl transition
                 h-[340px]"
    >
      {/* Cover image or gray fallback */}
      {post.cover_image ? (
        <Image
          src={post.cover_image}
          alt={post.title}
          className="absolute inset-0 -z-10 size-full object-cover"
          fill
          priority={false}
          unoptimized={post.cover_image.startsWith("data:")}
        />
      ) : (
        <div className="absolute inset-0 -z-10 size-full bg-gray-700" />
      )}

      {/* Dark overlay + ring */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      {/* Metadata: author + date */}
      <div className="flex flex-wrap items-center gap-x-4 text-sm text-gray-300">
        <div className="flex items-center gap-x-1">
          <FiUser size={14} className="text-gray-300" />
          <span>{post.writer?.name || "ناشناس"}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <FiCalendar size={14} className="text-gray-300" />
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString("fa-IR")}
          </time>
        </div>
      </div>

      {/* Blog title */}
      <h3 className="mt-3 text-lg font-semibold text-white line-clamp-2 leading-7">
        <Link
          href={`/blog/${post.topic_slug}/${post.slug}`}
          className="hover:text-gray-200 transition-colors"
        >
          <span className="absolute inset-0" />
          {post.title}
        </Link>
      </h3>
    </article>
  );
}
