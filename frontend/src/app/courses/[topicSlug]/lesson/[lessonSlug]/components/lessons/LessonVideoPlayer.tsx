import { CoursesLesson } from "@/app/types/coursesType";

/** Displays a lesson video from Aparat if available, with a direct link fallback (responsive typography) */
export default function LessonVideoPlayer({ lessonData }: { lessonData: CoursesLesson }) {
  if (!lessonData.video_url) return null;

  // Extract Aparat video hash from given URL
  const getAparatVideoHash = (url: string) => {
    const match = url.match(/aparat\.com\/v\/([^\/]+)/);
    return match ? match[1] : null;
  };

  const videoHash = getAparatVideoHash(lessonData.video_url);

  // Fallback — direct link if hash cannot be extracted
  if (!videoHash) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <a
          href={lessonData.video_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] sm:text-sm text-hoboc-dark hover:text-hoboc-dark/90"
        >
          مشاهده ویدیو در آپارات
        </a>
      </div>
    );
  }

  // Embed Aparat video
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-base sm:text-lg font-bold mb-3">پخش ویدیو</h3>
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          src={`https://www.aparat.com/video/video/embed/videohash/${videoHash}/vt/frame`}
          allowFullScreen
          className="w-full h-full"
          title="Aparat Video Player"
        ></iframe>
      </div>
      <div className="mt-2 text-[12px] sm:text-sm text-gray-500 text-center">
        <a
          href={lessonData.video_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          مشاهده ویدیو در آپارات
        </a>
      </div>
    </div>
  );
}
