// app/components/inspire/InspiringQuote.tsx
"use client";

import InspiringQuoteBackground from "./InspiringQuoteBackground";
import InspiringQuoteCard from "./InspiringQuoteCard";

/** Container for the inspiring quote section with responsive card sizing */
export default function InspiringQuote() {
  return (
    <div className="lg:pr-10" dir="rtl">
      <section
        className="relative overflow-hidden bg-gray-900 
                   py-16 sm:py-24 lg:py-32 font-vazir rounded-3xl"
      >
        <InspiringQuoteBackground />

        {/* The card container is slightly narrower and with less padding on mobile */}
        <div className="relative mx-auto max-w-xl sm:max-w-2xl md:max-w-3xl text-center px-3 sm:px-6">
          <InspiringQuoteCard />
        </div>
      </section>
    </div>
  );
}
