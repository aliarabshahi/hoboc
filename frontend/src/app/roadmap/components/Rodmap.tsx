"use client";

import { RoadmapItem } from "./RoadmapItem";
import { RoadmapLegend } from "./RoadmapLegend";
import { RoadmapItem as RoadmapItemType } from "@/app/types/roadmapType";

interface RoadmapProps {
  title: string;
  description: string;
  roadmapData: RoadmapItemType[];
}

/** Roadmap section with responsive title, description, item list, and legend */
export const Roadmap = ({ title, description, roadmapData }: RoadmapProps) => {
  return (
    <div
      className="bg-white/70 backdrop-blur-md 
                 p-5 sm:p-7 md:p-8 rounded-xl 
                 shadow-[0_2px_10px_rgba(31,158,206,0.07)] 
                 border border-[#1F9ECE]/15 w-full"
    >
      {/* Header */}
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F9ECE] mb-2">
          {title}
        </h2>
        <p className="text-[#393939]/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {/* Roadmap items */}
      <div className="space-y-4">
        {roadmapData.map((item) => (
          <RoadmapItem key={item.id} {...item} />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6">
        <RoadmapLegend />
      </div>
    </div>
  );
};
