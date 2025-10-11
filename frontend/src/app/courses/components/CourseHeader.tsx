"use client";
interface CourseHeaderProps {
  title: string;
  description: string;
}
const CourseHeader: React.FC<CourseHeaderProps> = ({ title, description }) => {
  return (
    <section className="relative isolate overflow-hidden pt-14 md:pt-20 pb-10 md:pb-16 shadow-sm rounded-b-md bg-gradient-to-br from-white to-[#fef6fb]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f9ece10] to-[#f477b815]" />
        <div className="absolute top-3 md:top-5 left-3 md:left-5 w-32 h-32 md:w-60 md:h-60 bg-[#1F9ECE] rounded-full mix-blend-multiply filter blur-xl opacity-10" />
        <div className="absolute top-2 md:top-3 right-10 md:right-16 w-28 h-28 md:w-52 md:h-52 bg-[#F477B8] rounded-full mix-blend-multiply filter blur-xl opacity-10" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10" dir="rtl">
        <div className="mb-3 md:mb-4 flex justify-center">
          <div className="w-14 md:w-20 h-1 bg-gradient-to-r from-[#1F9ECE] to-[#F477B8] rounded-full opacity-80"></div>
        </div>
        <h1 className="text-2xl sm:text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-gray-800 tracking-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-[15px] md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};
export default CourseHeader;
