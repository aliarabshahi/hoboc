import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { CoursesLesson } from "@/app/types/coursesType";
import Link from "next/link";
import { FaChevronLeft, FaLock } from "react-icons/fa";

/** Lists all lessons in the current topic for display in the lesson sidebar */
export default async function SideBarTopicLessons({
  topicSlug,
  currentLessonSlug,
}: {
  topicSlug: string;
  currentLessonSlug: string;
}) {
  const res = await getApiData(`/course-lessons/?topic-slug=${topicSlug}&ordering=created_at`);

  // API error UI
  if (!res || !res.data) {
    return (
      <div className="bg-pink-50 p-4 rounded-xl shadow-sm border border-pink-100 text-hoboc text-sm">
        <p className="font-medium text-pink-700">خطا در دریافت اطلاعات</p>
        <p className="mt-1 text-pink-600">
          دریافت اطلاعات دروس با خطا مواجه شد.
        </p>
      </div>
    );
  }

  const lessons: CoursesLesson[] = res.data;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-hoboc-dark mb-3 pb-2 border-b border-gray-100">
        محتوای دوره
      </h2>

      {/* Empty state */}
      {lessons.length === 0 ? (
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-gray-500 text-sm">درسی برای این موضوع یافت نشد.</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {lessons.map((lesson, index) => {
            const isActive = lesson.slug === currentLessonSlug;

            return (
              <Link
                key={lesson.id}
                href={`/courses/${topicSlug}/lesson/${lesson.slug}`}
                className={`group block px-2 py-1 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-hoboc/15 border border-hoboc/40"
                    : "hover:bg-hoboc/5"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="flex justify-between items-center">
                  {/* Left: lesson number or lock + title */}
                  <div className="flex items-center gap-3 min-w-0 overflow-hidden">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive
                          ? "bg-hoboc text-white"
                          : lesson.is_free
                          ? "bg-hoboc/15 text-hoboc"
                          : "bg-pink-100 text-pink-700"
                      }`}
                    >
                      {!lesson.is_free && !isActive ? (
                        <FaLock className="w-3 h-3" />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <h3
                      className={`text-sm truncate ${
                        isActive
                          ? "text-hoboc font-bold"
                          : lesson.is_free
                          ? "text-gray-800 group-hover:text-hoboc"
                          : "text-pink-700"
                      }`}
                    >
                      {lesson.title}
                      {!lesson.is_free && (
                        <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full mr-2">
                          ویژه
                        </span>
                      )}
                    </h3>
                  </div>

                  {/* Right: duration + chevron */}
                  <div
                    className={`flex items-center gap-1 text-xs whitespace-nowrap ${
                      isActive ? "text-hoboc" : "text-gray-400"
                    }`}
                  >
                    <span>{lesson.duration} دقیقه</span>
                    <FaChevronLeft
                      className={`w-3 h-3 ${
                        isActive ? "text-hoboc" : "text-gray-300"
                      }`}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
