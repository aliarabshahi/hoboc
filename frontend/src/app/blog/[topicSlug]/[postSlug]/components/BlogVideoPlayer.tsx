import { BlogPost } from "@/app/types/blogType";

/** Responsive typography; smaller titles in mobile */
export default function BlogVideoPlayer({ postData }: { postData: BlogPost }) {
  if (!postData.video_url && !postData.video_file) return null;

  if (postData.video_file) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-base sm:text-lg font-bold mb-3">پخش ویدیو</h3>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <video
            controls
            className="w-full h-full"
            poster={postData.thumbnail || undefined}
          >
            <source src={postData.video_file} type="video/mp4" />
            مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
          </video>
        </div>
      </div>
    );
  }

  if (postData.video_url) {
    const match = postData.video_url.match(/aparat\.com\/v\/([^\/]+)/);
    const videoHash = match ? match[1] : null;

    if (!videoHash)
      return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <a
            href={postData.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] sm:text-sm text-blue-600 hover:text-blue-800"
          >
            مشاهده ویدیو در آپارات
          </a>
        </div>
      );

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
            href={postData.video_url}
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

  return null;
}
