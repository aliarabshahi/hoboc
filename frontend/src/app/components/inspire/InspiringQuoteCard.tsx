// app/components/inspire/InspiringQuoteCard.tsx
"use client";

import { InspiringQuoteData } from "./InspiringQuoteTexts";

/** Quote text block with optional author info for InspiringQuote */
export default function InspiringQuoteCard() {
  return (
    <figure>
      {/* Persian quote text */}
      <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-relaxed">
        <p>{InspiringQuoteData.quote}</p>
      </blockquote>

      {/* Author and role (shown only if showAuthor is true) */}
      {InspiringQuoteData.showAuthor && (
        <figcaption className="mt-6 text-base text-gray-300">
          <div className="font-semibold">{InspiringQuoteData.author}</div>
          <div className="mt-1">{InspiringQuoteData.role}</div>
        </figcaption>
      )}
    </figure>
  );
}
