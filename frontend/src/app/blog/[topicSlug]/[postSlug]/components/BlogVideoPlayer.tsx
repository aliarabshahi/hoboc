import { BlogPost } from "@/app/types/blogType";

/**
 * BlogVideoPlayer
 * Renders a video player for a blog post if a video file or Aparat URL is provided.
 * Supports:
 * - Directly hosted MP4 file.
 * - Aparat embedded video (with fallback link if parsing fails).
 */
export default function BlogVideoPlayer({ postData }: { postData: BlogPost }) {
  // Return nothing if no video source is available
  if (!postData.video_url && !postData.video_file) return null;

  // === Case 1: Handle uploaded/hosted MP4 video file ===
  if (postData.video_file) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        {/* Persian title for "Play Video" */}
        <h3 className="text-lg font-bold mb-3">پخش ویدیو</h3>

        {/* HTML5 video player with poster fallback (thumbnail > cover image) */}
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <video 
            controls 
            className="w-full h-full"
            poster={postData.thumbnail || postData.cover_image || undefined}
          >
            <source src={postData.video_file} type="video/mp4" />
            {/* Persian fallback string for browsers without video support */}
            مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
          </video>
        </div>
      </div>
    );
  }

  // === Case 2: Handle Aparat video URL ===
  if (postData.video_url) {
    /**
     * Extracts Aparat video hash from URL.
     * Example input: "https://www.aparat.com/v/abcd123"
     * Output: "abcd123"
     */
    const getAparatVideoHash = (url: string) => {
      const match = url.match(/aparat\.com\/v\/([^\/]+)/);
      return match ? match[1] : null;
    };

    const videoHash = getAparatVideoHash(postData.video_url);

    // --- Fallback: if no valid hash, link to video on Aparat ---
    if (!videoHash) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <a 
            href={postData.video_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-800"
          >
            مشاهده ویدیو در آپارات
          </a>
        </div>
      );
    }

    // --- Embedded Aparat video player ---
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        {/* Persian title for "Play Video" */}
        <h3 className="text-lg font-bold mb-3">پخش ویدیو</h3>

        {/* Responsive embedded Aparat iframe */}
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <iframe
            src={`https://www.aparat.com/video/video/embed/videohash/${videoHash}/vt/frame`}
            allowFullScreen
            className="w-full h-full"
            title="Aparat Video Player"
          ></iframe>
        </div>

        {/* Link to open video directly on Aparat */}
        <div className="mt-2 text-sm text-gray-500 text-center">
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
