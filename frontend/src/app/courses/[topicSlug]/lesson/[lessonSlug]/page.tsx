import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { CoursesLesson, CoursesTopic } from "@/app/types/coursesType";
import { notFound } from "next/navigation";
import LessonPdfViewer from "./components/lessons/LessonPdfViewer";
import Sidebar from "./components/lessons/sidebar/Sidebar";
import LessonNavigationBar from "./components/lessons/LessonNavigationBar";

interface Params {
  params: {
    topicSlug: string;
    lessonSlug: string;
  };
}

export default async function LessonPage({ params }: Params) {
  // --- Fetch lesson data ---
  const response = await getApiData(
    `course-lessons?lesson-slug=${params.lessonSlug}`
  );
  let lessonData: CoursesLesson | undefined;

  if (Array.isArray(response.data)) {
    lessonData = (response.data as CoursesLesson[]).find(
      (l: CoursesLesson) => l.slug === params.lessonSlug
    );
  } else if (response.data?.results) {
    lessonData = (response.data.results as CoursesLesson[]).find(
      (l: CoursesLesson) => l.slug === params.lessonSlug
    );
  } else {
    lessonData = response.data as CoursesLesson;
  }
  if (!lessonData) notFound();

  // --- Fetch topic data ---
  const topicResponse = await getApiData(
    `/course-topics/?topic-slug=${params.topicSlug}`
  );
  let topicData: CoursesTopic | undefined;

  if (Array.isArray(topicResponse.data)) {
    topicData = (topicResponse.data as CoursesTopic[]).find(
      (t: CoursesTopic) => t.slug === params.topicSlug
    );
  } else if (topicResponse.data?.results) {
    topicData = (topicResponse.data.results as CoursesTopic[]).find(
      (t: CoursesTopic) => t.slug === params.topicSlug
    );
  } else {
    topicData = topicResponse.data as CoursesTopic;
  }
  if (!topicData) notFound();

  // Server log (appears in terminal)
  // console.log("🖥 Server log → lessonData:", lessonData);
  // console.log("🖥 Server log → topicData:", topicData);

  return (
    <div dir="rtl" className="relative isolate overflow-hidden min-h-screen">
      {/* Custom background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffafd] via-[#fdf6fa] to-white" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f477b80a] via-transparent to-transparent opacity-5" />
        <div className="absolute top-[10%] left-[12%] w-32 h-32 bg-[#F477B8] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.02]" />
        <div className="absolute top-[19%] right-[15%] w-20 h-20 bg-[#fbb5d4] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.015]" />
        <div className="absolute bottom-[17%] left-1/3 w-20 h-20 bg-[#fbd3e7] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.018]" />
      </div>

      {/* Page container */}
      <section className="container mx-auto px-4 md:px-8 lg:px-20 py-8">
        <LessonNavigationBar topic={topicData} lessonTitle={lessonData.title} />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* PDF Viewer */}
          <div className="flex-1 min-w-0 order-2 lg:order-1">
            {lessonData.pdf_file && (
              <div className="border rounded-lg shadow-lg overflow-hidden h-[80vh] w-full">
                <LessonPdfViewer pdfUrl={lessonData.pdf_file} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 xl:w-96 order-1 lg:order-2 flex-shrink-0">
            <div className="sticky top-16 space-y-6">
              <Sidebar
                lessonData={lessonData}
                topicSlug={params.topicSlug}
                currentLessonSlug={params.lessonSlug}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
