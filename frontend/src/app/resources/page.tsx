"use client";

import { useEffect, useState } from "react";
import ResourceImage from "./components/ResourceImage";
import ResourceList from "./components/ResourceList";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";

function ResourceSkeleton() {
  return (
    <div className="w-full h-[500px] bg-[#E9D7EB]/30 rounded-xl animate-pulse" />
  );
}

export default function ResourcesPage() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getApiData("/resource-items/");
      setResources(data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBFD] px-6 sm:px-8 lg:px-12 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* تصویر سمت چپ - sticky */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 lg:sticky lg:top-0 self-start">
            <ResourceImage />
          </div>

          {/* لیست منابع */}
          <div className="w-full lg:w-1/2 order-2 pt-10">
            {loading ? <ResourceSkeleton /> : <ResourceList resources={resources} />}
          </div>
        </div>
      </div>
    </div>
  );
}
