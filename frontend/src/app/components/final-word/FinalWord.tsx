// app/components/final-word/FinalWord.tsx
"use client";

import FinalWordCard from "./FinalWordCard";
import FinalWordBackground from "./FinalWordBackground";

/** Top-level container for the FinalWord section */
export default function FinalWord() {
  return (
    <div className="relative bg-white z-0 overflow-hidden" dir="rtl">
      {/* Content area */}
      <div className="relative isolate px-6 pt-8 pb-8 sm:pt-12 sm:pb-10 md:pt-14 md:pb-12 lg:pt-24 lg:pb-14">
        <FinalWordCard />
      </div>

      {/* Decorative background element */}
      <FinalWordBackground />
    </div>
  );
}
