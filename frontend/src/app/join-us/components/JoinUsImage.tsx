"use client";
import Image from "next/image";

/** Static illustration displayed alongside the Join Us form */
export default function JoinUsImage() {
  return (
    <div className="w-full h-full flex items-start justify-start">
      <Image
        src="/images/forms/join-us.svg"
        alt="ارسال رزومه"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
