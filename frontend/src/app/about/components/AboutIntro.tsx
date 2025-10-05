export default function AboutIntro() {
  return (
    // Intro container for the "About" page
    <div className="text-center">
      {/* Main heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#1F9ECE] ">
        درباره <span className="text-[#F477B8]">هوبوک</span>
      </h1>

      {/* Subheading / short description */}
      <p className="mt-4 text-lg text-gray-600 ">
        یه جایی برای یاد گرفتن، پیشرفت کردن و ساختن آینده‌ای که با دیتا روشن‌تره
      </p>
    </div>
  );
}
