// app/components/last-lessons/LatestLessonsArrowButton.tsx
"use client";

import { ReactNode } from "react";

/** Navigation arrow button for lesson carousel */
export default function LatestLessonsArrowButton({
  onClick,
  icon,
  ariaLabel,
}: {
  onClick: () => void;
  icon: ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="p-2 rounded-full bg-gray-100 text-hoboc-dark hover:bg-gray-200 transition"
    >
      {icon}
    </button>
  );
}

/** Skeleton arrow button placeholder shown while loading */
export function LatestLessonsSkeletonArrowButton() {
  return (
    <div className="p-2 rounded-full bg-[#E9D7EB]/30  animate-pulse">
      <div className="w-6 h-6" />
    </div>
  );
}
