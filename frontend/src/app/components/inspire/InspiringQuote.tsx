// app/components/inspire/InspiringQuote.tsx
"use client";

import InspiringQuoteBackground from "./InspiringQuoteBackground";
import InspiringQuoteCard from "./InspiringQuoteCard";

/** Container for the inspiring quote section with background and text card */
export default function InspiringQuote() {
  return (
    <div className="lg:pr-10" dir="rtl">
      <section className="relative overflow-hidden bg-gray-900 py-24 sm:py-32 font-vazir rounded-3xl">
        <InspiringQuoteBackground />
        <div className="relative mx-auto max-w-3xl text-center px-4">
          <InspiringQuoteCard />
        </div>
      </section>
    </div>
  );
}
