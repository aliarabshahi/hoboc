// app/notifications/components/NotificationImage.tsx
"use client";

import Image from "next/image";

/** Static illustration displayed beside the notification subscription form */
export default function NotificationImage() {
  return (
    <div className="w-full h-full flex items-start justify-start md:pt-6">
      <Image
        src="/images/forms/notification.svg" // Image asset must exist in /public/images/forms/
        alt="عضویت در خبرنامه تخصصی مهندسی داده، هوش مصنوعی و تحلیل داده هوبوک"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
