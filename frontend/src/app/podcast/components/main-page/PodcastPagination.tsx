// app/podcast/components/main-page/PodcastPagination.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PodcastPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/** Simple podcast pagination with next/previous buttons (RTL layout) */
export default function PodcastPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PodcastPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-8 mt-10" dir="rtl">
      {/* Previous page button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="p-2 rounded-full bg-gray-100 text-hoboc-dark hover:bg-gray-200 transition disabled:opacity-50"
        aria-label="صفحه قبلی"
      >
        <ChevronRight size={24} />
      </button>

      {/* Next page button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="p-2 rounded-full bg-gray-100 text-hoboc-dark hover:bg-gray-200 transition disabled:opacity-50"
        aria-label="صفحه بعدی"
      >
        <ChevronLeft size={24} />
      </button>
    </div>
  );
}
