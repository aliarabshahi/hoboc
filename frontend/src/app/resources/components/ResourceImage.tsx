"use client";

import Image from "next/image";

/** Static illustration reused from the notification form */
export default function ResourceImage() {
  return (
    <div className="w-full h-full flex items-start justify-start">
      <Image
        src="/images/forms/notification.svg"
        alt="منابع آموزشی مهندسی داده"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
