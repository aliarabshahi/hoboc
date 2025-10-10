"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

type Props = {
  title: string;
  link: string;
  icon: IconType;
  iconColor: string;
  bgColor: string;
  hoverColor: string;
  delay?: number;
};

export default function VisionCard({
  title,
  link,
  icon: Icon,
  iconColor,
  bgColor,
  hoverColor,
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      viewport={{ once: true }}
    >
      <Link
        href={link}
        className={`group flex flex-col items-center justify-center text-center
                    sm:flex-row sm:items-center sm:text-right
                    p-3 sm:p-4 rounded-lg transition-colors duration-200 border border-gray-100 ${hoverColor}`}
      >
        {/* Icon */}
        <div
          className={`flex justify-center items-center rounded-lg ${bgColor} ${iconColor}
                      w-9 h-9 sm:w-12 sm:h-12 flex-shrink-0
                      transition-transform duration-150 ease-out group-hover:scale-[1.12]`}
        >
          <Icon size={22} className="sm:size-[30px] opacity-90" />
        </div>

        {/* Title */}
        <div className="flex-1 mt-2 sm:mt-0 sm:mr-4">
          <h3
            className="font-semibold text-[#393939] text-sm sm:text-base md:text-lg
                       transition-colors duration-150 group-hover:text-[#000000]"
          >
            {title}
          </h3>
        </div>

        {/* Arrow — unchanged in desktop */}
        <FaArrowLeft
          className="hidden sm:block text-gray-400 group-hover:text-[#000000]
                     text-xs sm:text-sm transition-colors"
        />
      </Link>
    </motion.div>
  );
}
