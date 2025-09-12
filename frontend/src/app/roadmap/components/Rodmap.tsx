import { RoadmapItem } from "./RoadmapItem";
import { RoadmapLegend } from "./RoadmapLegend";
import { RoadmapItem as RoadmapItemType } from "@/app/types/roadmapType";

interface RoadmapProps {
  title: string;
  description: string;
  roadmapData: RoadmapItemType[];
}

/** Renders the complete roadmap section with title, description, roadmap steps, and a legend for level meanings */
export const Roadmap = ({ title, description, roadmapData }: RoadmapProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-full">
      {/* Section header: title and description */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-hoboc mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      {/* Roadmap items list */}
      <div className="space-y-4">
        {roadmapData.map((item) => (
          <RoadmapItem key={item.id} {...item} />
        ))}
      </div>

      {/* Level legend */}
      <RoadmapLegend />
    </div>
  );
};
