"use client";

export default function BlogCTABanner() {
  return (
    <div className="container mx-auto px-4 flex flex-col items-center text-center py-10">
      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-hoboc-dark mb-4" dir="rtl">
        داستان تازه‌ای قراره شروع بشه!
      </h2>

      <p className="text-hoboc text-sm sm:text-base md:text-lg max-w-2xl" dir="rtl">
        اینجا جاییه برای ماجراجوها؛ همونایی که می‌خوان از دل داده‌ها دنیاهای جدید بسازن.
        آماده‌ای؟ چون قراره با هم کلی چیز باحال کشف کنیم! 🚀
      </p>
    </div>
  );
}
