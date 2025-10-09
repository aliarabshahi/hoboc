"use client";

import { useEffect, useState } from "react";
import ProjectOrderForm from "./components/ProjectOrderForm";
import ProjectOrderImage from "./components/ProjectOrderImage";

/** Simple skeleton placeholder for the project order form */
function ProjectOrderFormSkeleton() {
  return (
    <div className="w-full h-[500px] bg-gray-200  rounded-xl animate-pulse" />
  );
}

/** Page layout for the project order section — image on the left, form on the right */
export default function ProjectOrderPage() {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay before showing the form
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fffbfd]  py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Project order illustration — sticky on desktop */}
          <div className="w-full lg:w-1/2 order-1 lg:order-1 lg:sticky lg:top-0 self-start">
            <ProjectOrderImage />
          </div>

          {/* Project order form or loading skeleton */}
          <div className="w-full lg:w-1/2 order-2 lg:order-2">
            {loading ? <ProjectOrderFormSkeleton /> : <ProjectOrderForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
