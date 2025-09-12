// app/components/latest-blogs/useLatestBlogs.ts
"use client";

import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { BlogPost } from "@/app/types/blogType";

/**
 * Fetches latest blog posts from API.
 * @param pageSize - Max number of posts to retrieve.
 */
export default function useLatestBlogs(pageSize: number = 6) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getApiData(
          `/blog-posts/?page_size=${pageSize}&ordering=-created_at`
        );
        if (res.data) {
          setPosts(Array.isArray(res.data) ? res.data : res.data.results || []);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [pageSize]);

  return { posts, loading };
}
