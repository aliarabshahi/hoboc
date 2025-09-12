import { FaHandsHelping, FaRocket, FaUserGraduate } from "react-icons/fa";

export default function AboutFeatures() {
  return (
    // Main grid container for all features
    <div className="grid gap-10 md:grid-cols-3 text-center text-gray-700 dark:text-gray-200">
      
      {/* Feature 1 — Free Education */}
      <div className="p-6 bg-gradient-to-br from-[#1f9ece08] to-[#f477b810] dark:from-[#1f9ece15] dark:to-[#f477b815] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <FaUserGraduate className="mx-auto text-[#1F9ECE] text-3xl mb-4" />
        <h3 className="text-xl font-semibold mb-2">آموزش رایگان</h3>
        <p className="text-sm leading-6">
          تو هوبوک، یادگیری توی اولویته. آموزش‌هایی با کیفیت، کاملاً رایگان، درباره‌ی دیتا، ابزارهای حرفه‌ای، و تجربه‌هایی که تو هیچ کلاس دیگه‌ای نمی‌شنوی.
        </p>
      </div>

      {/* Feature 2 — Real Projects */}
      <div className="p-6 bg-gradient-to-br from-[#1f9ece08] to-[#f477b810] dark:from-[#1f9ece15] dark:to-[#f477b815] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <FaRocket className="mx-auto text-[#1F9ECE] text-3xl mb-4" />
        <h3 className="text-xl font-semibold mb-2">پروژه‌های واقعی</h3>
        <p className="text-sm leading-6">
          ما فقط تئوری نمی‌گیم. واقعاً پروژه انجام می‌دیم، از ایده تا اجرا. اگه دوست داری با مسائل واقعی سر و کله بزنی، جای درستی اومدی.
        </p>
      </div>

      {/* Feature 3 — Friendly Community */}
      <div className="p-6 bg-gradient-to-br from-[#1f9ece08] to-[#f477b810] dark:from-[#1f9ece15] dark:to-[#f477b815] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <FaHandsHelping className="mx-auto text-[#1F9ECE] text-3xl mb-4" />
        <h3 className="text-xl font-semibold mb-2">یه جامعه‌ی باحال</h3>
        <p className="text-sm leading-6">
          ما اینجاییم تا یه جمع دوستانه و فعال بسازیم؛ کنار هم رشد کنیم، یاد بگیریم و کلی تجربه به اشتراک بذاریم. تو هم بیا کنارمون :)
        </p>
      </div>
    </div>
  );
}
