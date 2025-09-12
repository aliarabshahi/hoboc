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
        className={`group flex items-center p-4 rounded-lg transition-colors duration-200 border border-gray-100 ${hoverColor}`}
      >
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          className={`w-12 h-12 flex justify-center items-center rounded-lg ${bgColor} ${iconColor}`}
        >
          <Icon size={30} className="opacity-90" />
        </motion.div>

        {/* Title */}
        <div className="flex-1 mr-4">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>

        {/* Arrow */}
        <FaArrowLeft className="text-gray-400 group-hover:text-current text-sm" />
      </Link>
    </motion.div>
  );
}
