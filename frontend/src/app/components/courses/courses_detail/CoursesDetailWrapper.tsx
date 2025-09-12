// app/components/courses/courses_detail/CoursesDetailWrapper.tsx

import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { CoursesTopic } from "@/app/types/coursesType";
import CoursesDetail from "./CoursesDetail";

/** Server wrapper to fetch course topics and pass the initial topic to CoursesDetail */
export default async function CoursesDetailWrapper() {
  // Fetch all course topics from API
  const { data: topics } = await getApiData("/course-topics/");

  // Select the first topic as default (or null if none exist)
  const initialTopic = topics?.length > 0 ? topics[0] : null;

  return (
    // z-40 → stays below navbar (z-50) but above most background content
    <div className="relative z-40 bg-transparent">
      <CoursesDetail initialTopic={initialTopic} topics={topics} />
    </div>
  );
}
