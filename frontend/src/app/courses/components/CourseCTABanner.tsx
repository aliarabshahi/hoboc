"use client";

/** Courses CTA banner - motivational heading + short description */
export default function CourseCTABanner() {
  return (
    <div className="container mx-auto px-4 flex flex-col items-center text-center py-10">
      {/* Heading */}
      <h2 className="font-bold text-3xl text-hoboc-dark mb-4" dir="rtl">
        آماده‌ای دنیای داده‌ها رو کشف کنی؟
      </h2>

      {/* Supporting description */}
      <p className="text-hoboc text-lg max-w-2xl" dir="rtl">
        اینجا جاییه برای ماجراجوهای داده؛ همونایی که می‌خوان از دل داده‌ها جهان‌های جدید بسازن و هر روز چیزهای باحال کشف کنن! 🚀
      </p>
    </div>
  );
}
