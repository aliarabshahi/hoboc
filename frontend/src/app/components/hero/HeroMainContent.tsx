// app/components/hero/HeroMainContent.tsx
import { IoPlayCircleSharp } from "react-icons/io5";

/** Main Hero content: video button, heading, description, and CTA */
export default function HeroMainContent({
  onVideoOpen,
}: {
  onVideoOpen: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl pt-12 sm:pt-16 lg:pt-24 pb-6 sm:pb-10 lg:pb-12 px-4 sm:px-6">
      {/* Video trigger button */}
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <button
          onClick={onVideoOpen}
          className="group flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium leading-6 
                     text-gray-700 ring-1 ring-gray-900/10 transition-all duration-300 ease-out
                     hover:ring-2 hover:ring-hoboc-dark"
        >
          <IoPlayCircleSharp
            className="text-xl text-gray-500 transition-all duration-300 group-hover:text-hoboc-dark 
                         group-hover:scale-110"
          />
          <span>معرفی کوتاه ما</span>
        </button>
      </div>

      {/* Optimized Persian heading, description, and call-to-action */}
      <div className="text-center space-y-6 sm:space-y-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-gray-900 leading-tight sm:leading-tight">
          با <span className="text-hoboc-dark">مهندسی داده</span>،
          <span className="bg-gradient-to-r from-hoboc to-purple-600 bg-clip-text text-transparent">
            {" "}
            هوش مصنوعی
          </span>{" "}
          رو از نو بساز
          <span className="text-gray-600">!</span>
        </h1>

        <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 max-w-3xl mx-auto">
          <strong>یادگیری کاربردی</strong> به همراه{" "}
          <strong>اجرای پروژه‌های واقعی</strong> در حوزه داده: از طراحی{" "}
          <strong>پایپ‌لاین‌های حرفه‌ای</strong> تا تبدیل{" "}
          <strong>داده‌های خام </strong>
          به <strong>راه‌حل‌های هوشمند کسب‌وکاری</strong>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="/courses"
            className="w-full sm:w-auto rounded-md bg-hoboc px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-sm 
                       hover:bg-hoboc-dark focus-visible:outline focus-visible:outline-2 
                       focus-visible:outline-offset-2 focus-visible:outline-hoboc-dark 
                       transition-all duration-300 hover:shadow-lg text-center"
          >
            شروع یادگیری رایگان
          </a>
          <a
            href="/project-order"
            className="w-full sm:w-auto rounded-md bg-gradient-to-r from-purple-500 to-hoboc px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold 
                       text-white shadow-sm hover:shadow-lg transition-all duration-300 text-center"
          >
            سفارش پروژه
          </a>
        </div>
      </div>
    </div>
  );
}
