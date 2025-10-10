"use client";

import { FiChevronDown, FiChevronUp, FiCheck, FiClock, FiAward } from "react-icons/fi";
import { useState } from "react";
import {
  RoadmapItem as RoadmapItemType,
  RoadmapLevel,
  RoadmapStatus,
} from "@/app/types/roadmapType";

interface RoadmapItemProps extends RoadmapItemType {}

export const RoadmapItem = ({
  id,
  title,
  description,
  level,
  status,
  resources = [],
}: RoadmapItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = () => {
    switch (status) {
      case "تکمیل شده":
        return <FiCheck className="text-white text-xs sm:text-sm" />;
      case "در حال یادگیری":
        return <FiClock className="text-white text-xs sm:text-sm" />;
      default:
        return <FiAward className="text-white text-xs sm:text-sm" />;
    }
  };

  const getLevelColor = (): string => {
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

  const getStatusColor = (): string => {
    switch (status) {
      case "تکمیل شده":
        return "bg-[#C3EAD8] text-[#17694A]";
      case "در حال یادگیری":
        return "bg-[#FFF3C4] text-[#7C6D21]";
      default:
        return "bg-[#F1E8F5] text-[#4B3D5A]";
    }
  };

  return (
    <div
      className="bg-white/80 backdrop-blur-md rounded-xl 
                 shadow-[0_2px_10px_rgba(31,158,206,0.07)] 
                 border border-[#1F9ECE]/15 overflow-hidden"
    >
      {/* Header */}
      <div
        className="p-3 sm:p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getLevelColor()}`}
          >
            {getStatusIcon()}
          </div>

          <div>
            <h3 className="text-sm sm:text-base md:text-lg font-medium text-[#393939]">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6F82] leading-snug">
              {description}
            </p>
          </div>
        </div>

        <div className="text-[#8DA9C4]">
          {isExpanded ? <FiChevronUp size={16} className="sm:size-[18px]" /> : <FiChevronDown size={16} className="sm:size-[18px]" />}
        </div>
      </div>

      {isExpanded && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-2 border-t border-[#1F9ECE]/15">
          <div className="mb-2 sm:mb-3">
            <span
              className={`px-2 py-0.5 sm:px-2.5 rounded-full text-[10px] sm:text-xs font-medium text-white ${getLevelColor()}`}
            >
              {level}
            </span>
          </div>

          {resources.length > 0 && (
            <div className="mt-2 sm:mt-3">
              <h4 className="font-medium text-xs sm:text-sm text-[#393939] mb-1.5">
                منابع یادگیری:
              </h4>
              <ul className="space-y-1.5">
                {resources.map((resource, idx) => (
                  <li key={idx}>
                    <a
                      href={resource.url}
                      className="text-xs sm:text-sm text-[#1F9ECE] hover:underline flex items-center gap-1.5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-3 sm:mt-4 flex justify-end">
            <span
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium ${getStatusColor()}`}
            >
              {status}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
