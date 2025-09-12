"use client";

import {
  FaGraduationCap,
  FaUsers,
  FaLaptopCode,
  FaPodcast,
} from "react-icons/fa";
import VisionCard from "./VisionCard";

export default function VisionTexts() {
  // Vision cards data is now defined here directly
  const visions = [
    {
      title: "آموزش و رشد حرفه‌ای",
      link: "/courses",
      icon: FaGraduationCap,
      iconColor: "text-cyan-500",
      bgColor: "bg-cyan-50",
      hoverColor: "hover:bg-cyan-100",
    },
    {
      title: "شبکه متخصصان",
      link: "/join-us",
      icon: FaUsers,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-50",
      hoverColor: "hover:bg-rose-100",
    },
    {
      title: "ثبت و سفارش پروژه",
      link: "/join-us",
      icon: FaLaptopCode,
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
    },
    {
      title: "پادکست",
      link: "/podcast",
      icon: FaPodcast,
      iconColor: "text-pink-500",
      bgColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-100",
    },
  ];

  return (
    <div className="space-y-3 w-full" dir="rtl">
      {visions.map((vision, index) => (
        <VisionCard key={vision.title} {...vision} delay={index * 0.1} />
      ))}
    </div>
  );
}
