"use client";

import { BookOpen, GraduationCap, Video, Briefcase } from "lucide-react";

type ResourceType = "book" | "course" | "video" | "tool";

interface Resource {
  id: number;
  title: string;
  creator: string;
  type: ResourceType;
  link: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Designing Data-Intensive Applications",
    creator: "Martin Kleppmann",
    type: "book",
    link: "https://dataintensive.net/",
  },
  {
    id: 2,
    title: "Data Engineering Zoomcamp",
    creator: "DataTalks.Club",
    type: "course",
    link: "https://github.com/DataTalksClub/data-engineering-zoomcamp",
  },
  {
    id: 3,
    title: "Kafka in Action",
    creator: "Dylan Scott & Viktor Gamov",
    type: "book",
    link: "https://www.manning.com/books/kafka-in-action",
  },
  {
    id: 4,
    title: "Spark در عمل",
    creator: "ژان ژورن پرن",
    type: "book",
    link: "https://spark.apache.org/",
  },
  {
    id: 5,
    title: "Modern Data Stack Explained",
    creator: "Seattle Data Guy",
    type: "video",
    link: "https://www.youtube.com/@SeattleDataGuy",
  },
  {
    id: 6,
    title: "مستندات dbt",
    creator: "dbt Labs",
    type: "tool",
    link: "https://docs.getdbt.com/",
  },
];

const typeIcons: Record<ResourceType, JSX.Element> = {
  book: <BookOpen className="text-sky-500 w-6 h-6" />,
  course: <GraduationCap className="text-pink-500 w-6 h-6" />,
  video: <Video className="text-sky-500 w-6 h-6" />,
  tool: <Briefcase className="text-pink-500 w-6 h-6" />,
};

export default function ResourceList() {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 w-full">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-hoboc mb-2">منابع آموزشی مهندسی داده</h2>
        <p className="text-gray-600">
          مجموعه‌ای از منابع مفید برای یادگیری و پیشرفت در مسیر مهندسی داده
        </p>
      </div>

      {/* Resource Cards */}
      <div className="space-y-4">
        {resources.map((res) => (
          <a
            key={res.id}
            href={res.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm p-4 flex items-center hover:shadow-md hover:bg-gray-100 transition relative"
          >
            {/* Icon moved to top-right */}
            <div className="absolute top-3 right-3">
              {typeIcons[res.type]}
            </div>
            
            {/* Text content centered */}
            <div className="flex-1 text-center">
              <h3 className="text-base font-medium text-gray-800">{res.title}</h3>
              <p className="text-sm text-gray-500">{res.creator}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}