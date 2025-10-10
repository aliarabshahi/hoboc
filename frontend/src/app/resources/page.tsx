"use client";

import { useEffect, useState } from "react";
import ResourceImage from "./components/ResourceImage";
import ResourceList from "./components/ResourceList";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";

function ResourceSkeleton() {
  return (
    <div className="w-full h-[500px] bg-gray-200 rounded-xl animate-pulse" />
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
    <div className="min-h-screen bg-[#fffbfd] py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* تصویر سمت چپ */}
          <div className="w-full lg:w-1/2 order-1 lg:sticky lg:top-0 self-start pt-8">
            <ResourceImage />
          </div>

          {/* لیست منابع یا اسکلتون */}
          <div className="w-full lg:w-1/2 pt-14 order-2">
            {loading ? (
              <ResourceSkeleton />
            ) : (
              <ResourceList resources={resources} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
