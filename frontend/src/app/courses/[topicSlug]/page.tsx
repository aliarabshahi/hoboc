import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { CoursesTopic, CoursesLesson } from "@/app/types/coursesType";
import { notFound } from "next/navigation";
import CourseNavigationBar from "./components/CourseNavigationBar";
import CourseSideBar from "./components/CourseSideBar";
import CourseLessonDetails from "./components/CourseLessonDetails";

interface PageProps {
  params: {
    topicSlug: string;
  };
}

/** Course topic page - shows lessons for a specific topic with sidebar and navigation */
export default async function TopicPage({ params }: PageProps) {
  // Fetch topic details by slug
  const topicResponse = await getApiData(
    `/course-topics/?topic-slug=${params.topicSlug}`
  );
  if (
    !topicResponse ||
    !topicResponse.data ||
    topicResponse.data.length === 0
  ) {
    return notFound(); // Show 404 if topic not found
  }
  const topic: CoursesTopic = topicResponse.data[0];

  // Fetch lessons for this topic
  const lessonResponse = await getApiData(
    `/course-lessons/?topic-slug=${params.topicSlug}`
  );
  const lessons: CoursesLesson[] = lessonResponse?.data || [];

  return (
    <div dir="rtl" className="relative isolate overflow-hidden min-h-screen">
      {/* Soft gradient background with faint decorative shapes */}
      <div className="absolute inset-0 -z-10">
        {/* Whisper-pink gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffafd] via-[#fdf6fa] to-white" />
        {/* Subtle pink overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f477b80a] via-transparent to-transparent opacity-5" />
        {/* Faint blurred pink blobs */}
        <div className="absolute top-[10%] left-[12%] w-32 h-32 bg-[#F477B8] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.02]" />
        <div className="absolute top-[19%] right-[15%] w-20 h-20 bg-[#fbb5d4] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.015]" />
        <div className="absolute bottom-[17%] left-1/3 w-20 h-20 bg-[#fbd3e7] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.018]" />
      </div>

      {/* Page content container */}
      <section className="container mx-auto px-4 md:px-8 lg:px-20 py-8">
        {/* Top navigation bar */}
        <CourseNavigationBar topic={topic} />

        {/* Two-column layout: sidebar + lesson details */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Sidebar with lesson list navigation */}
          <CourseSideBar topic={topic} lessons={lessons} />

          {/* Lesson details/content area */}
          <CourseLessonDetails topic={topic} lessons={lessons} />
        </div>
      </section>
    </div>
  );
}
