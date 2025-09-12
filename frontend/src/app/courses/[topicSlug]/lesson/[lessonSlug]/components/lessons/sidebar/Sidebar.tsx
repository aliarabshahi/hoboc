// components/lessons/sidebar/Sidebar.tsx

import { CoursesLesson } from "@/app/types/coursesType";
import SidebarLessonDetails from "./SidebarLessonDetails";
import SidebarVideoPlayer from "./SidebarVideoPlayer";
import SideBarTopicLessons from "./SideBarTopicLessons";

/** Sidebar container for lesson pages — displays lesson details, video, and topic lessons list */
export default function Sidebar({
  lessonData,
  topicSlug,
  currentLessonSlug,
}: {
  lessonData: CoursesLesson;
  topicSlug: string;
  currentLessonSlug: string;
}) {
  return (
    <div className="space-y-4">
      <SidebarLessonDetails lessonData={lessonData} />
      <SidebarVideoPlayer lessonData={lessonData} />
      <SideBarTopicLessons
        topicSlug={topicSlug}
        currentLessonSlug={currentLessonSlug}
      />
    </div>
  );
}
