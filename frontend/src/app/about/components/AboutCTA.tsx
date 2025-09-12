export default function AboutCTA() {
  return (
    <div className="text-center">
      {/* Section heading */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        آماده‌ای شروع کنیم؟
      </h2>

      {/* Section description */}
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        چه بخوای مهارت یاد بگیری، چه بخوای پروژه‌ات رو بسپری، ما کنارتیم!
      </p>

      {/* Call-to-action buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {/* Link to courses */}
        <a
          href="/courses"
          className="bg-hoboc hover:bg-hoboc-dark text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm"
        >
          مشاهده دوره‌ها
        </a>

        {/* Link to contact page */}
        <a
          href="/contact"
          className="bg-white dark:bg-gray-800 border border-hoboc text-hoboc dark:text-hoboc-dark font-medium py-3 px-6 rounded-lg transition-colors hover:bg-hoboc/5 dark:hover:bg-hoboc/10"
        >
          تماس با ما
        </a>
      </div>
    </div>
  );
}
