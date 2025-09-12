// app/components/final-word/FinalWordCard.tsx
"use client";

import Link from "next/link";
import { finalWordData } from "./FinalWordTexts";

/** Visible content of the FinalWord section: title, description, and button */
export default function FinalWordCard() {
  return (
    <div className="mx-auto max-w-2xl text-center space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 leading-snug sm:text-5xl pr-8">
        {finalWordData.title}
      </h1>

      <p className="text-base font-medium text-gray-600 sm:text-lg leading-relaxed pr-4">
        {finalWordData.description}
      </p>

      <div className="pt-4">
        <Link
          href={finalWordData.button.href}
          className="rounded-md bg-hoboc px-6 py-3 text-base font-semibold text-white shadow-sm 
                     hover:bg-hoboc-dark focus-visible:outline focus-visible:outline-2 
                     focus-visible:outline-offset-2 focus-visible:outline-hoboc-dark 
                     transition-colors"
        >
          {finalWordData.button.label}
        </Link>
      </div>
    </div>
  );
}
