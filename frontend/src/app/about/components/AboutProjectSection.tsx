export default function AboutProjectSection() {
  return (
    <div className="space-y-12">
      
      {/* Section 1 — About Hubook */}
      <div className="bg-gradient-to-br from-[#1f9ece08] to-[#f477b810] dark:from-[#1f9ece15] dark:to-[#f477b815] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-justify leading-7 text-gray-700 dark:text-gray-200">
        <h2 className="text-xl font-bold mb-4 text-[#1F9ECE]">هوبوک چیه اصلاً؟</h2>
        <p className="mb-4">
          هوبوک یه پلتفرم خودجوشه که چند تا مهندس با عشق به داده راه انداختن.
          هدف‌مون ساده‌ست: کمک کنیم هر کسی که به دنیای مهندسی داده علاقه‌منده،
          بتونه بدون هزینه واردش بشه؛ نه تبلیغ داریم، نه هزینه، فقط یادگیری واقعی.
        </p>
        <p>
          علاوه بر آموزش، پروژه‌ هم انجام می‌دیم؛ از ساخت پایپ‌لاین‌های پیچیده
          گرفته تا تحلیل دیتاهای بزرگ با ابزارهایی مثل Kafka و Spark و کلی چیز
          دیگه. خلاصه اینکه هم آموزش داریم، هم عمل!
        </p>
      </div>

      {/* Section 2 — Data team services */}
      <div className="bg-gradient-to-br from-[#1f9ece15] to-[#f477b820] dark:from-[#1f9ece20] dark:to-[#f477b825] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-justify leading-7 text-gray-700 dark:text-gray-200">
        <h2 className="text-xl font-bold mb-4 text-[#1F9ECE]">نیاز به تیم دیتایی داری؟</h2>
        <p className="mb-4">
          ما فقط آموزش نمی‌دیم، بلکه یه تیم واقعی از مهندسای داده‌ایم که حاضرن
          پروژه‌های شما رو هم انجام بدن — از تحلیل داده‌های پیچیده گرفته تا طراحی
          سیستم‌های داده‌محور، داشبوردهای مدیریتی، پیاده‌سازی Kafka و Spark و حتی
          مشاوره برای تیم‌هاتون.
        </p>
        <p>
          اگه پروژه‌ای داری که نیاز به تخصص داره، یا دوست داری یه تیم حرفه‌ای
          همراهت باشه، با ما در تماس باش. با هم بررسیش می‌کنیم و اگر خواستی،
          برات انجامش می‌دیم.
        </p>
      </div>
    </div>
  );
}
