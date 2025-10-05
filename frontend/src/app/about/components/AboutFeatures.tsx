import { FaHandsHelping, FaRocket, FaUserGraduate } from "react-icons/fa";

export default function AboutFeatures() {
  return (
    // Main grid container for all features
    <div className="grid gap-10 md:grid-cols-3 text-center text-gray-700 ">
      
      {/* Feature 1 — Free Education */}
      <div className="p-6 bg-gradient-to-br from-[#1f9ece08] to-[#f477b810]   rounded-xl shadow-sm border border-gray-100 ">
        <FaUserGraduate className="mx-auto text-[#1F9ECE] text-3xl mb-4" />
        <h3 className="text-xl font-semibold mb-2">آموزش رایگان و تخصصی</h3>
        <p className="text-sm leading-6">
          دسترسی به <strong>آموزش‌های باکیفیت و کاملاً رایگان</strong> در حوزه مهندسی داده، هوش مصنوعی و تحلیل داده. 
          یادگیری <strong>ابزارهای حرفه‌ای</strong> و <strong>تجربیات عملی</strong> که مسیر رشد حرفه‌ای شما رو هموار می‌کنه.
        </p>
      </div>

      {/* Feature 2 — Real Projects */}
      <div className="p-6 bg-gradient-to-br from-[#1f9ece08] to-[#f477b810]   rounded-xl shadow-sm border border-gray-100 ">
        <FaRocket className="mx-auto text-[#1F9ECE] text-3xl mb-4" />
        <h3 className="text-xl font-semibold mb-2">پروژه‌های واقعی و کاربردی</h3>
        <p className="text-sm leading-6">
          اجرای <strong>پروژه‌های واقعی</strong> از ایده تا پیاده‌سازی. 
          تجربه‌ی کار با <strong>چالش‌های عملی</strong> در حوزه داده و هوش مصنوعی، 
          از طراحی <strong>پایپ‌لاین</strong> تا پیاده‌سازی <strong>راهکارهای هوشمند</strong>.
        </p>
      </div>

      {/* Feature 3 — Friendly Community */}
      <div className="p-6 bg-gradient-to-br from-[#1f9ece08] to-[#f477b810]   rounded-xl shadow-sm border border-gray-100 ">
        <FaHandsHelping className="mx-auto text-[#1F9ECE] text-3xl mb-4" />
        <h3 className="text-xl font-semibold mb-2">جامعه‌ی متخصصان داده</h3>
        <p className="text-sm leading-6">
          عضویت در <strong>جامعه‌ی پویا و حرفه‌ای</strong> متخصصان داده. 
          <strong>تبادل تجربه</strong>، <strong>یادگیری جمعی</strong> و <strong>همکاری در پروژه‌ها</strong> 
          در محیطی صمیمی و پشتیبان.
        </p>
      </div>
    </div>
  );
}