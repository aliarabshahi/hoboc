// app/components/latest-blogs/LatestBlogsArrowButton.tsx
"use client";

import { ReactNode } from "react";

/** Carousel navigation arrow button for latest blogs section */
export default function LatestBlogsArrowButton({
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

/** Skeleton placeholder for arrow buttons while loading */
export function LatestBlogsSkeletonArrowButton() {
  return (
    <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse">
      <div className="w-6 h-6" />
    </div>
  );
}
