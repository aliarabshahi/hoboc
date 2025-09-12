// app/components/last-lessons/useLatestLessons.ts
"use client";

import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { CoursesLesson } from "@/app/types/coursesType";

/**
 * Fetches and manages the latest lessons from the API.
 * @param pageSize - Number of lessons to fetch from server.
 */
export default function useLatestLessons(pageSize: number = 6) {
  const [lessons, setLessons] = useState<CoursesLesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await getApiData(
          `/course-lessons/?page_size=${pageSize}&ordering=-created_at`
        );
        if (res.data) {
          setLessons(
            Array.isArray(res.data) ? res.data : res.data.results || []
          );
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [pageSize]);

  return { lessons, loading };
}
