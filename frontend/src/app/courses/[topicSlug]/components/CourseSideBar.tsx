import { CoursesTopic, CoursesLesson } from "@/app/types/coursesType";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";
import { FiBookmark, FiUser, FiClock, FiBarChart2 } from "react-icons/fi";

interface CourseSideBarProps {
  topic: CoursesTopic;
  lessons: CoursesLesson[];
}

/** Sidebar for course topic pages — responsive text sizes */
export default function CourseSideBar({ topic, lessons }: CourseSideBarProps) {
  const totalDuration = lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0);
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  const durationText = hours > 0 ? `${hours} ساعت و ${minutes} دقیقه` : `${minutes} دقیقه`;

  const instructor = lessons.find(lesson => lesson.instructor)?.instructor;
  const firstLesson = lessons[0]?.slug;

  return (
    <div className="lg:w-80 xl:w-96 flex-shrink-0">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:sticky lg:top-[4.5rem] lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">
        
        {/* Back link */}
        <Link 
          href="/courses" 
          className="flex items-center text-[13px] sm:text-sm text-gray-500 hover:text-hoboc mb-4 transition-colors"
        >
          <BsArrowLeftShort className="w-5 h-5 ml-1" />
          بازگشت به دوره‌ها
        </Link>

        {/* Cover */}
        <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
          <Image src={topic.image} alt={topic.title} fill className="object-cover" />
        </div>

        {/* Titles */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-hoboc-dark mb-1">
          {topic.title}
        </h1>
        <h2 className="text-base sm:text-lg text-hoboc mb-4">
          {topic.catchy_title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-[13px] sm:text-[15px] md:text-base mb-6 leading-relaxed">
          {topic.description}
        </p>

        {/* Metadata */}
        <div className="mt-3 space-y-2 text-[12px] sm:text-[13px] md:text-[14px]">
          {instructor && (
            <div className="flex items-center gap-2">
              <FiUser className="text-gray-500" size={14} />
              <span className="text-gray-500">مدرس:</span>
              <span className="text-green-600">{instructor.name}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <FiClock className="text-gray-500" size={14} />
            <span className="text-gray-500">مدت زمان:</span>
            <span className="text-green-600">{durationText}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiBarChart2 className="text-gray-500" size={14} />
            <span className="text-gray-500">سطح:</span>
            <span className="text-green-600">مقدماتی</span>
          </div>
        </div>

        {/* Start course button */}
        {firstLesson ? (
          <Link 
            href={`/courses/${topic.slug}/lesson/${firstLesson}`}
            className="btn bg-hoboc hover:bg-hoboc-dark text-white w-full mt-6 transition-colors text-[13px] sm:text-sm"
          >
            شروع دوره
          </Link>
        ) : (
          <button 
            className="btn bg-gray-400 text-white w-full mt-6 cursor-not-allowed text-[13px] sm:text-sm"
            disabled
          >
            هیچ درسی موجود نیست
          </button>
        )}

        {/* Tags */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center text-gray-500 text-[12px] sm:text-[13px] gap-2 mb-2">
            <FiBookmark size={14} className="text-gray-500" />
            <span>برچسب‌ها:</span>
          </div>
          <div className="flex flex-wrap gap-2" dir="ltr">
            {lessons.flatMap(lesson => lesson.tags)
              .filter((tag, index, self) =>
                index === self.findIndex(t => t.id === tag.id)
              )
              .slice(0, 3)
              .map(tag => (
                <span 
                  key={tag.id}
                  className="bg-hoboc/10 text-hoboc px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium hover:bg-hoboc-dark/10 transition-colors"
                >
                  {tag.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
