"use client";
import Image from "next/image";

/** Static illustration displayed alongside the Join Us form */
export default function JoinUsImage() {
  return (
    <div className="w-full h-full flex items-start justify-start md:pt-6">
      <Image
        src="/images/forms/join-us.svg"
        alt="ارسال رزومه و همکاری با تیم هوبوک در حوزه مهندسی داده و هوش مصنوعی"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
