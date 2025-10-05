"use client";

import { FiChevronDown, FiChevronUp, FiCheck, FiClock, FiAward } from "react-icons/fi";
import { useState } from "react";
import {
  RoadmapItem as RoadmapItemType,
  RoadmapLevel,
  RoadmapStatus,
} from "@/app/types/roadmapType";

interface RoadmapItemProps extends RoadmapItemType {}

/** Displays a single roadmap step with expandable details, level/status indicators, and learning resources */
export const RoadmapItem = ({
  id,
  title,
  description,
  level,
  status,
  resources = [],
}: RoadmapItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Returns icon based on current status
  const getStatusIcon = () => {
    switch (status) {
      case "تکمیل شده":
        return <FiCheck className="text-white text-sm" />;
      case "در حال یادگیری":
        return <FiClock className="text-white text-sm" />;
      default:
        return <FiAward className="text-white text-sm" />;
    }
  };

  // Returns background color for level badge
  const getLevelColor = (): string => {
    switch (level) {
      case "مبتدی":
        return "bg-hoboc";
      case "متوسط":
        return "bg-hoboc-dark";
      case "پیشرفته":
        return "bg-purple-600";
      default:
        return "bg-gray-500";
    }
  };

  // Returns styling for status badge
  const getStatusColor = (): string => {
    switch (status) {
      case "تکمیل شده":
        return "bg-green-100  text-green-800 ";
      case "در حال یادگیری":
        return "bg-yellow-100  text-yellow-800 ";
      default:
        return "bg-gray-100  text-gray-800 ";
    }
  };

  return (
    <div className="bg-white  rounded-lg shadow-sm border border-gray-200  overflow-hidden transition-all">
      {/* Header row: icon + title/description + expand toggle */}
      <div
        className="p-3 sm:p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getLevelColor()}`}
          >
            {getStatusIcon()}
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-800 ">
              {title}
            </h3>
            <p className="text-sm text-gray-600 ">
              {description}
            </p>
          </div>
        </div>
        <div className="text-gray-400">
          {isExpanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100 ">
          {/* Level badge */}
          <div className="mb-3">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor()} text-white`}
            >
              {level}
            </span>
          </div>

          {/* Learning resources */}
          {resources.length > 0 && (
            <div className="mt-3">
              <h4 className="font-medium text-sm text-gray-700  mb-1.5">
                منابع یادگیری:
              </h4>
              <ul className="space-y-1.5">
                {resources.map((resource, idx) => (
                  <li key={idx}>
                    <a
                      href={resource.url}
                      className="text-sm text-hoboc-dark  hover:underline flex items-center gap-1.5"
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

          {/* Status badge */}
          <div className="mt-4 flex justify-end">
            <span
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor()}`}
            >
              {status}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
