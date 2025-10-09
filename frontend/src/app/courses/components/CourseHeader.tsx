"use client";

interface CourseHeaderProps {
  title: string;
  description: string;
}

/** Courses page header - gradient background with decorative shapes */
const CourseHeader: React.FC<CourseHeaderProps> = ({ title, description }) => {
  return (
    <section className="relative isolate overflow-hidden pt-16 md:pt-20 pb-12 md:pb-16 shadow-sm rounded-b-md bg-gradient-to-br from-white to-[#fef6fb]">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f9ece10] to-[#f477b815]" />
        
        {/* Decorative blurred circles (responsive sizes) */}
        <div className="absolute top-3 md:top-5 left-3 md:left-5 w-40 h-40 md:w-60 md:h-60 bg-[#1F9ECE] rounded-full mix-blend-multiply filter blur-xl opacity-10" />
        <div className="absolute top-2 md:top-3 right-10 md:right-16 w-32 h-32 md:w-52 md:h-52 bg-[#F477B8] rounded-full mix-blend-multiply filter blur-xl opacity-10" />
      </div>

      {/* Foreground content */}
      <div className="container mx-auto px-4 text-center relative z-10" dir="rtl">
        {/* Accent divider line */}
        <div className="mb-3 md:mb-4 flex justify-center">
          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-[#1F9ECE] to-[#F477B8] rounded-full opacity-80"></div>
        </div>
        
        {/* Page title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-800 tracking-tight">
          {title}
        </h1>
        
        {/* Page description */}
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};

export default CourseHeader;
