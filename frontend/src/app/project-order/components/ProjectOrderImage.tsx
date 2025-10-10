"use client";

import Image from "next/image";

/** Static illustration displayed beside the project order form */
export default function ProjectOrderImage() {
  return (
    <div className="w-full h-full flex items-start justify-start md:pt-6">
      <Image
        src="/images/forms/project-order.svg" // Ensure this asset exists in /public/images/forms/
        alt="سفارش پروژه تخصصی مهندسی داده، هوش مصنوعی و تحلیل داده"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
