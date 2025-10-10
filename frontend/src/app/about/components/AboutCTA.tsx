export default function AboutCTA() {
  return (
    <div className="text-center">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
        آماده‌ای برای تحول در دنیای داده؟
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6">
        چه برای <strong>یادگیری مهارت‌های تخصصی</strong> و چه برای <strong>اجرای پروژه‌های داده‌محور</strong>، 
        ما همراه شما هستیم تا بهترین نتایج رو کسب کنید.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="/courses"
          className="bg-hoboc hover:bg-hoboc-dark text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-colors shadow-sm hover:shadow-md text-sm sm:text-base"
        >
          شروع یادگیری رایگان
        </a>
        <a
          href="/contact"
          className="bg-white border border-hoboc text-hoboc font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-colors hover:bg-hoboc/5 shadow-sm text-sm sm:text-base"
        >
          درخواست مشاوره تخصصی
        </a>
      </div>
    </div>
  );
}
