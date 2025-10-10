"use client";

import {
  FaGraduationCap,
  FaUsers,
  FaLaptopCode,
  FaPodcast,
} from "react-icons/fa";
import VisionCard from "./VisionCard";

export default function VisionTexts() {
  const visions = [
    {
      title: "آموزش و رشد حرفه‌ای",
      link: "/courses",
      icon: FaGraduationCap,
      iconColor: "text-[#1F9ECE]",
      bgColor: "bg-[#D9ECF7]",
      hoverColor: "hover:bg-[#CFE3F1]",
    },
    {
      title: "شبکه متخصصان",
      link: "/join-us",
      icon: FaUsers,
      iconColor: "text-[#5C6F82]",
      bgColor: "bg-[#E9D7EB]",
      hoverColor: "hover:bg-[#E1CBE3]",
    },
    {
      title: "ثبت و سفارش پروژه",
      link: "/project-order",
      icon: FaLaptopCode,
      iconColor: "text-[#84D3F0]",
      bgColor: "bg-[#EAF6FA]",
      hoverColor: "hover:bg-[#D8EFF7]",
    },
    {
      title: "پادکست",
      link: "/podcast",
      icon: FaPodcast,
      iconColor: "text-[#9A88B6]",
      bgColor: "bg-[#F3E9FA]",
      hoverColor: "hover:bg-[#E9DBF5]",
    },
  ];

  return (
    <div className="space-y-3 w-full" dir="rtl">
      {visions.map((v, i) => (
        <VisionCard key={v.title} {...v} delay={i * 0.1} />
      ))}
    </div>
  );
}
