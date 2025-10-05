"use client";

import React, { useEffect, useState } from "react";
import CoursesDetailHeader from "./CoursesDetailHeader";
import CoursesDetailContent from "./CoursesDetailContent";
import CoursesDetailImage from "./CoursesDetailImage";
import CourseTopicList from "../courses_topic/CourseTopicList";
import { fetchApiData } from "@/app/services/receive_data/apiClientAxios";
import { useTopicStore } from "@/app/stores/topicStore";
import { CoursesTopic } from "@/app/types/coursesType";

interface CoursesDetailProps {
  initialTopic: CoursesTopic | null;
  topics: CoursesTopic[];
}

/** Skeleton placeholder for loading course details */
const SkeletonLoader = () => (
  <div className="flex flex-col gap-6" dir="rtl">
    {/* Fake header */}
    <div className="h-14 w-1/5 bg-gray-100 rounded-lg animate-pulse" />
    {/* Main flex container */}
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Content block */}
      <div className="lg:w-2/3 h-[200px] bg-gray-100  rounded-xl animate-pulse" />
      {/* Image block */}
      <div className="lg:w-1/3 h-[200px] aspect-video bg-gray-100  rounded-xl animate-pulse" />
    </div>
  </div>
);

/** Shown when no topic is selected */
const NoTopicSelected = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-32 h-32 bg-gray-100 rounded-full mb-4"></div>
    <p className="text-lg text-gray-500">لطفاً یک موضوع را انتخاب کنید</p>
  </div>
);

/** Shown when no course is found for the selected topic */
const CourseNotFound = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-32 h-32 bg-gray-100 rounded-full mb-4"></div>
    <p className="text-lg text-gray-500">دوره مورد نظر یافت نشد</p>
  </div>
);

/** Container for course details with topic selector and dynamic data loading */
const CoursesDetail = ({ initialTopic, topics }: CoursesDetailProps) => {
  const { activeTopic, setActiveTopic } = useTopicStore();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize store's activeTopic from initial server data if available
  useEffect(() => {
    if (initialTopic && !activeTopic) {
      setActiveTopic(initialTopic);
    }
  }, [initialTopic, activeTopic, setActiveTopic]); // ✅ kept deps correct

  // Fetch course lessons for the selected topic
  useEffect(() => {
    const fetchData = async () => {
      if (!activeTopic) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchApiData<any>("course-lessons", {
          "topic-slug": activeTopic.slug,
        });
        setCourseData(data.results[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTopic?.slug]); // ✅ OK

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Topic selector bar */}
      <CourseTopicList initialTopics={topics} />

      {/* Conditional rendering: loader → error → no topic → course details */}
      {loading ? (
        <SkeletonLoader />
      ) : error ? (
        <div className="alert alert-error" dir="rtl">
          {error}
        </div>
      ) : !activeTopic ? (
        <NoTopicSelected />
      ) : (
        <>
          <CoursesDetailHeader topic={activeTopic} />
          {courseData ? (
            <div className="flex flex-col lg:flex-row gap-8" dir="rtl">
              <CoursesDetailContent course={courseData} />
              <div className="lg:w-1/3 flex flex-col gap-6">
                <CoursesDetailImage topic={activeTopic} />
              </div>
            </div>
          ) : (
            <CourseNotFound />
          )}
        </>
      )}
    </div>
  );
};

export default CoursesDetail;
