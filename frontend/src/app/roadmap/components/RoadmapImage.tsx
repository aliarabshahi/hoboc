"use client";

import Image from "next/image";

/** Static roadmap illustration for the Roadmap page */
export default function RoadmapImage() {
  return (
    <div className="w-full h-full flex items-start justify-start">
      <Image
        src="/images/roadmap_page/roadmap.svg"
        alt="نقشه راه تحول داده‌محور - از مهندسی داده تا هوش مصنوعی و تحلیل پیشرفته"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}