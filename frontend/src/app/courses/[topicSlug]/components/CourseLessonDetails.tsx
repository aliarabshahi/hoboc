import { CoursesLesson, CoursesTopic } from "@/app/types/coursesType";
import Link from "next/link";
import { FaChevronLeft, FaLock } from "react-icons/fa";
import { BsBook } from "react-icons/bs";

function truncateDescription(text: string, maxLength = 150): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const slice = text.slice(0, maxLength);
  const lastSpaceIndex = slice.lastIndexOf(" ");
  return (lastSpaceIndex === -1 ? slice : slice.slice(0, lastSpaceIndex)) + "...";
}

/** Lesson list for a specific course topic with responsive typography */
export default function CourseLessonDetails({
  topic,
  lessons,
}: {
  topic: CoursesTopic;
  lessons: CoursesLesson[];
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-base sm:text-lg md:text-xl font-bold mb-6 flex items-center text-hoboc-dark">
          <BsBook className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
          محتوای دوره
        </h2>

        <div className="overflow-y-auto max-h-[calc(100vh-200px)] pl-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="space-y-2">
            {lessons.map((lesson, index) => {
              const isPremium = !lesson.is_free;
              return (
                <Link
                  key={lesson.id}
                  href={`/courses/${topic.slug}/lesson/${lesson.slug}`}
                  className="group block rounded-lg p-3 transition-colors duration-200 bg-base-100 hover:bg-hoboc/5 focus:outline-none focus-visible:ring-0"
                  aria-label={`رفتن به درس ${lesson.title}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[12px] sm:text-sm font-semibold select-none ${
                          isPremium
                            ? "bg-pink-100 text-pink-700"
                            : "bg-hoboc text-white"
                        }`}
                      >
                        {isPremium ? <FaLock className="w-3 h-3" /> : index + 1}
                      </div>

                      <div className="text-right max-w-xs">
                        <h3
                          className={`text-[13px] sm:text-sm font-semibold truncate transition-colors ${
                            isPremium
                              ? "text-pink-700 group-hover:text-hoboc"
                              : "text-hoboc group-hover:text-hoboc/80"
                          }`}
                        >
                          {lesson.title}
                          {isPremium && (
                            <span className="text-[11px] sm:text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full mr-2">
                              ویژه
                            </span>
                          )}
                        </h3>
                        <p className="text-[12px] sm:text-[13px] text-gray-500 mt-0.5 leading-snug">
                          {truncateDescription(lesson.description, 100)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] sm:text-xs select-none">
                      <span className="whitespace-nowrap pr-2 text-gray-500">
                        {lesson.duration} دقیقه
                      </span>
                      {!isPremium && (
                        <span className="bg-hoboc text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          رایگان
                        </span>
                      )}
                      <FaChevronLeft className="w-4 h-4 text-gray-300 group-hover:text-hoboc transition-colors" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
