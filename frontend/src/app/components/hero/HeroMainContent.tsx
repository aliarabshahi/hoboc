// app/components/hero/HeroMainContent.tsx
import { IoPlayCircleSharp } from "react-icons/io5";

/** Main Hero content: video button, heading, description, and CTA */
export default function HeroMainContent({ onVideoOpen }: { onVideoOpen: () => void }) {
  return (
    <div className="mx-auto max-w-2xl pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12">
      {/* Video trigger button */}
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <button
          onClick={onVideoOpen}
          className="group flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium leading-6 
                     text-gray-700 ring-1 ring-gray-900/10 transition-all duration-300 ease-out"
        >
          <IoPlayCircleSharp
            className="text-xl text-gray-500 transition-colors duration-300 group-hover:text-red-500 
                         group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
          />
          <span>معرفی کوتاه ما</span>
        </button>
      </div>

      {/* Persian heading, description, and call-to-action */}
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:leading-tight">
          از داده خام تا <span className="text-hoboc-dark">ارزش واقعی</span>
        </h1>
        <p className="text-lg leading-8 text-gray-600">
          داستانِ تبدیل داده به تصمیم آغاز می‌شود؛ اینجا یاد می‌گیری با
          داده‌کاوی، مهندسی داده و هوش مصنوعی از دل داده‌ها بینش بسازی و
          ایده‌هات رو به نتیجه‌های واقعی برسونی.
        </p>

        <div className="flex items-center justify-center">
          <a
            href="/courses"
            className="rounded-md bg-hoboc px-6 py-3 text-base font-semibold text-white shadow-sm 
                       hover:bg-hoboc-dark focus-visible:outline focus-visible:outline-2 
                       focus-visible:outline-offset-2 focus-visible:outline-hoboc-dark 
                       transition-colors"
          >
            شروع مسیر یادگیری
          </a>
        </div>
      </div>
    </div>
  );
}
