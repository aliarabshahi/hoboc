"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

/** Pagination controls for course list navigation */
export default function CoursePagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex justify-center gap-8 mt-10">
      {/* Previous page button */}
      <button
        onClick={onPrev}
        disabled={currentPage === 0}
        className="p-2 rounded-full bg-gray-100 text-hoboc-dark hover:bg-gray-200 transition disabled:opacity-50"
        aria-label="صفحه قبلی"
      >
        <ChevronRight size={24} />
      </button>

      {/* Next page button */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        className="p-2 rounded-full bg-gray-100 text-hoboc-dark hover:bg-gray-200 transition disabled:opacity-50"
        aria-label="صفحه بعدی"
      >
        <ChevronLeft size={24} />
      </button>
    </div>
  );
}
