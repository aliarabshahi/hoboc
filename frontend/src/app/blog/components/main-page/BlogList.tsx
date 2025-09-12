"use client";

import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { fetchApiData } from "@/app/services/receive_data/apiClientAxios";
import { BlogPost, BlogTopic } from "@/app/types/blogType";
import BlogPostCard from "../BlogPostCard";
import BlogListSkeletonCard from "./BlogListSkeletonCard";
import BlogPagination from "./BlogPagination";

export default function BlogList({
  selectedTopicSlug,
  pageSize,
}: {
  selectedTopicSlug?: string;
  pageSize: number;
}) {
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<BlogTopic[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch topics and posts whenever the selected topic changes ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch available blog topics
        const topicsResponse = await getApiData("/blog-topics/?page_size=30");
        const fetchedTopics: BlogTopic[] = Array.isArray(topicsResponse.data)
          ? topicsResponse.data
          : topicsResponse.data?.results || [];
        setTopics(fetchedTopics);

        // Fetch blog posts filtered by selected topic (if any)
        const postsResponse = await fetchApiData<BlogPost>(
          "blog-posts",
          selectedTopicSlug ? { "topic-slug": selectedTopicSlug } : undefined
        );
        setPosts(postsResponse.results);
      } catch (err) {
        setError("Error fetching blog data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTopicSlug]);

  // --- Pagination setup ---
  const totalPages = Math.ceil(posts.length / pageSize);
  const currentPosts = posts.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  // Reset to first page when topic changes
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTopicSlug]);

  // --- Loading state ---
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(pageSize)].map((_, i) => (
          <BlogListSkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // --- Error state ---
  if (error) {
    return <div className="text-red-500 text-center mt-16">{error}</div>;
  }

  // --- No posts found state (UI text in Persian left as-is) ---
  if (posts.length === 0) {
    return (
      <div className="text-gray-500 text-center mt-16">مطلبی یافت نشد!</div>
    );
  }

  // --- Main list and pagination ---
  return (
    <>
      {/* Blog post cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => {
            if (currentPage > 0) {
              setCurrentPage((p) => p - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          onNext={() => {
            if (currentPage < totalPages - 1) {
              setCurrentPage((p) => p + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        />
      )}
    </>
  );
}
