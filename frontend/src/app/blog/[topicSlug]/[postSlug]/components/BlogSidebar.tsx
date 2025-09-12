import { BlogPost } from "@/app/types/blogType";
import BlogVideoPlayer from "./BlogVideoPlayer";
import { FiUser, FiCalendar, FiBookmark } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

interface BlogSidebarProps {
  postData: BlogPost;
  topicSlug: string;
  currentPostSlug: string;
}

/**
 * BlogSidebar
 * Displays blog post meta-information, cover image, and optional video player.
 * Intended for use alongside the main blog post content (PDF / text).
 */
export default function BlogSidebar({ postData, topicSlug }: BlogSidebarProps) {
  return (
    <div className="space-y-4">
      {/* === Post Info Card === */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        {/* --- Post Title --- */}
        <h1 className="text-2xl font-bold text-gray-800">{postData.title}</h1>

        {/* --- Post Short Description (if provided) --- */}
        {postData.description && (
          <p className="text-gray-500 leading-relaxed text-[15px]">
            {postData.description}
          </p>
        )}

        {/* --- Metadata (Author, Date, Tags) --- */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          {/* Author information */}
          {postData.writer && (
            <div className="flex items-center gap-3">
              {/* Label */}
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <FiUser className="text-gray-500" size={14} />
                <span>نویسنده:</span>
              </div>

              {/* Author avatar + name */}
              <div className="flex items-center gap-2">
                {postData.writer.profile_picture && (
                  <Image
                    src={postData.writer.profile_picture}
                    alt={postData.writer.name}
                    className="w-6 h-6 rounded-full object-cover"
                    width={24}
                    height={24}
                    unoptimized={postData.writer.profile_picture.startsWith("data:")}
                  />
                )}
                <span className="text-green-600 text-sm">
                  {postData.writer.name}
                </span>
              </div>
            </div>
          )}

          {/* Publication date */}
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FiCalendar className="text-gray-500" size={14} />
            <span>تاریخ انتشار:</span>
            <span className="text-gray-700">
              {new Date(postData.created_at).toLocaleDateString("fa-IR")}
            </span>
          </div>

          {/* Tag list (clickable links to tag-filtered topic page) */}
          {postData.tags?.length > 0 && (
            <div className="pt-2">
              {/* Tag label */}
              <div className="flex items-center text-gray-600 text-sm gap-2">
                <FiBookmark size={14} className="text-gray-500" />
                <span>برچسب‌ها:</span>
              </div>

              {/* Tag links (LTR for consistency in tag rendering) */}
              <div className="flex flex-wrap gap-2 mt-2" dir="ltr">
                {postData.tags.map((tag) => (
                  <Link
                    href={`/blog/${topicSlug}?tag=${tag.slug}`}
                    key={tag.id}
                    className="bg-hoboc/10 text-hoboc px-2.5 py-0.5 rounded-full text-xs font-medium hover:bg-hoboc-dark/10 transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* === Cover Image (shown as square aspect ratio) === */}
      {postData.cover_image && (
        <div className="bg-white p-0 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative w-full aspect-square">
            <Image
              src={postData.cover_image}
              alt={postData.title}
              fill
              className="object-cover"
              priority={true}
              unoptimized={postData.cover_image.startsWith("data:")}
            />
          </div>
        </div>
      )}

      {/* === Video Section (only if post has video file or URL) === */}
      {(postData.video_url || postData.video_file) && (
        <BlogVideoPlayer postData={postData} />
      )}
    </div>
  );
}
