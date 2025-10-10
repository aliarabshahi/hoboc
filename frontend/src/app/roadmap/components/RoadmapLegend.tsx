"use client";

import { RoadmapLevel } from "@/app/types/roadmapType";

export const RoadmapLegend = () => {
  const levels: RoadmapLevel[] = ["مبتدی", "متوسط", "پیشرفته"];

  const getLevelColor = (level: RoadmapLevel): string => {
    switch (level) {
      case "مبتدی":
        return "bg-[#8DA9C4]";
      case "متوسط":
        return "bg-[#5C6F82]";
      case "پیشرفته":
        return "bg-[#E9D7EB] text-[#393939]";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4">
        {levels.map((level) => (
          <div
            key={level}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium ${getLevelColor(
              level
            )}`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
            <span>{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
