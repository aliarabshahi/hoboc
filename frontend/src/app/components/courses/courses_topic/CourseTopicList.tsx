// app/components/courses/CourseTopicList.tsx
"use client";

import { useTopicStore } from "@/app/stores/topicStore";
import { CoursesTopic } from "@/app/types/coursesType";
import CourseTopic from "./CourseTopic";
import { useEffect, useState } from "react";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";

interface CourseTopicListProps {
  initialTopics: CoursesTopic[];
}

/** Horizontal list of course topics with active state and optional API fetch */
const CourseTopicList = ({ initialTopics }: CourseTopicListProps) => {
  const { activeTopic, setActiveTopic } = useTopicStore();
  const [topics, setTopics] = useState<CoursesTopic[]>(initialTopics || []);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialTopics?.length);

  useEffect(() => {
    // Skip fetch if server already provided initial data
    if (initialTopics?.length > 0) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await getApiData("/course-topics/");

        if (error) {
          setError(error);
        } else {
          const topicsData = data as CoursesTopic[];
          setTopics(topicsData);

          // Default select the first topic
          if (topicsData.length > 0 && !activeTopic) {
            setActiveTopic(topicsData[0]);
          }
        }
      } catch {
        setError("Failed to fetch topics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setActiveTopic, activeTopic, initialTopics]);

  // Handle selecting a new active topic
  const handleTopicClick = (topic: CoursesTopic) => {
    if (activeTopic?.slug !== topic.slug) {
      setActiveTopic(topic);
    }
  };

  // Loading state
  if (isLoading) {
    return <div className="flex justify-center py-4">Loading topics...</div>;
  }

  // API error state
  if (error) {
    return <div className="text-red-500 py-4">{error}</div>;
  }

  // Empty list state
  if (!topics.length) {
    return <div className="py-4">No topics available</div>;
  }

  // Render horizontal list of topics
  return (
    <div
      className="pt-3 pb-5 flex justify-center items-center gap-8 overflow-x-auto px-4"
      dir="rtl"
    >
      {topics.map((topic) => (
        <CourseTopic
          key={topic.id}
          topic={topic}
          isActive={activeTopic?.slug === topic.slug}
          onClick={() => handleTopicClick(topic)}
        />
      ))}
    </div>
  );
};

export default CourseTopicList;
