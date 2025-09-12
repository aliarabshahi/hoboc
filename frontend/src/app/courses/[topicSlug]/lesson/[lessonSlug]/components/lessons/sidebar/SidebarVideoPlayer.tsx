import { CoursesLesson } from "@/app/types/coursesType";
import LessonVideoPlayer from "../LessonVideoPlayer";

/** Wrapper for LessonVideoPlayer used in the lesson sidebar */
export default function SidebarVideoPlayer({
  lessonData,
}: {
  lessonData: CoursesLesson;
}) {
  return <LessonVideoPlayer lessonData={lessonData} />;
}
