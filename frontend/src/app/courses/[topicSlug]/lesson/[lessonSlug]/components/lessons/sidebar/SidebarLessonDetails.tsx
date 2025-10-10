import { CoursesLesson } from "@/app/types/coursesType";
import { FiClock, FiUser, FiBookmark } from "react-icons/fi";

/** Lesson details section for the sidebar — shows title, description, instructor, duration, and tags */
export default function SidebarLessonDetails({ lessonData }: { lessonData: CoursesLesson }) {
  const durationMinutes = lessonData.duration || 0;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const formattedDuration = hours > 0 ? `${hours} ساعت و ${minutes} دقیقه` : `${minutes} دقیقه`;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* عنوان درس */}
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 leading-snug">
        {lessonData.title}
      </h1>

      {/* توضیحات */}
      <p className="text-gray-500 mt-3 leading-relaxed text-[13px] sm:text-[15px] md:text-base">
        {lessonData.description}
      </p>

      {/* جزئیات مدرس، مدت زمان و برچسب‌ها */}
      <div className="mt-3 space-y-2 text-[12px] sm:text-[13px] md:text-[14px]">
        {lessonData.instructor && (
          <div className="flex items-center gap-2">
            <FiUser className="text-gray-500" size={14} />
            <span className="text-gray-500">مدرس:</span>
            <span className="text-green-600">{lessonData.instructor.name}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <FiClock className="text-gray-500" size={14} />
          <span className="text-gray-500">مدت زمان:</span>
          <span className="text-green-600">{formattedDuration}</span>
        </div>

        {lessonData.tags?.length > 0 && (
          <div>
            <div className="flex items-center text-gray-500 text-[12px] sm:text-[13px] gap-2">
              <FiBookmark size={14} className="text-gray-500" />
              <span>برچسب‌ها:</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-1" dir="ltr">
              {lessonData.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-hoboc/10 text-hoboc px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium hover:bg-hoboc-dark/10 transition-colors"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
