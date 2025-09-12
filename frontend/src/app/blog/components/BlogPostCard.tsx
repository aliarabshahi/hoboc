import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/app/types/blogType";
import { FiCalendar, FiUser } from "react-icons/fi";

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-hoboc flex flex-col transition hover:shadow-md relative overflow-hidden">
      
      {/* --- Square cover image --- */}
      <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized={post.cover_image.startsWith("data:")}
          />
        ) : (
          <span>No image available</span>
        )}
      </div>

      {/* --- Post title --- */}
      <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
        {post.title}
      </h3>

      {/* --- Meta info (author & publish date) --- */}
      <div className="flex items-center justify-between text-sm text-hoboc-dark mt-auto pt-3">
        {/* Author */}
        <div className="flex items-center gap-2">
          <FiUser size={14} className="text-hoboc-dark" />
          <span>{post.writer?.name || "Anonymous"}</span>
        </div>

        {/* Publish date */}
        <div className="flex items-center gap-2">
          <FiCalendar size={14} className="text-hoboc-dark" />
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString("fa-IR")}
          </time>
        </div>
      </div>

      {/* --- Clickable overlay link to full post --- */}
      <Link
        href={`/blog/${post.topic_slug}/${post.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Read more about ${post.title}`}
      />
    </div>
  );
}
