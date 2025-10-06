"use client";

import { useEffect, useState } from "react";
import ResourceImage from "./components/ResourceImage";
import ResourceList from "./components/ResourceList";

/** Skeleton placeholder while loading */
function ResourceSkeleton() {
  return (
    <div className="w-full h-[500px] bg-gray-200 rounded-xl animate-pulse" />
  );
}

/** Main Resources Page */
export default function ResourcesPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Image section */}
          <div className="w-full lg:w-1/2 order-1 lg:order-1 lg:sticky lg:top-0 self-start pt-8">
            <ResourceImage />
          </div>

          {/* Resource list */}
          <div className="w-full lg:w-1/2 order-2 lg:order-2">
            {loading ? <ResourceSkeleton /> : <ResourceList />}
          </div>
        </div>
      </div>
    </div>
  );
}
