import { RoadmapLevel } from "@/app/types/roadmapType";

/** Displays roadmap level legend with color-coded badges for each learning stage */
export const RoadmapLegend = () => {
  const levels: RoadmapLevel[] = ["مبتدی", "متوسط", "پیشرفته"];

  // Returns background/hover color classes for each level
  const getLevelColor = (level: RoadmapLevel): string => {
    switch (level) {
      case "مبتدی":
        return "bg-hoboc hover:bg-hoboc-dark text-white";
      case "متوسط":
        return "bg-hoboc-dark hover:bg-hoboc-darker text-white";
      case "پیشرفته":
        return "bg-purple-600 hover:bg-purple-700 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  return (
    <div className="mt-6">
      {/* Legend items */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4">
        {levels.map((level) => (
          <div
            key={level}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-sm ${getLevelColor(
              level
            )}`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
            <span>{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
