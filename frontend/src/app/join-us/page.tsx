"use client";

import { useEffect, useState } from "react";
import JoinUsForm from "./components/JoinUsForm";
import JoinUsImage from "./components/JoinUsImage";

/** Grey placeholder shown while JoinUsForm is loading */
function ResumeFormSkeleton() {
  return (
    <div className="w-full h-[500px] bg-gray-200  rounded-xl animate-pulse" />
  );
}

/** Resume page — shows a join-us form with an accompanying image and a short loading delay */
export default function ResumePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated loading delay before showing the form
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white  py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Image section */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 lg:sticky lg:top-0 self-start">
            <JoinUsImage />
          </div>

          {/* Form or skeleton placeholder */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            {loading ? <ResumeFormSkeleton /> : <JoinUsForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
