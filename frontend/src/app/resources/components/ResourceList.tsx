"use client";

import {
  BookOpen,
  GraduationCap,
  Video,
  Globe,
  Podcast,
  Newspaper,
  Building,
  Heart,
  User, // آیکون برای friend
} from "lucide-react";

type ResourceType =
  | "book"
  | "website"
  | "video"
  | "course"
  | "podcast"
  | "article"
  | "company"
  | "friend"; // نوع جدید

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
    title: "Modern Data Stack Explained",
    creator: "Seattle Data Guy",
    type: "video",
    link: "https://www.youtube.com/@SeattleDataGuy",
  },
  {
    id: 4,
    title: "Towards Data Science",
    creator: "Medium Publication",
    type: "website",
    link: "https://towardsdatascience.com/",
  },
  {
    id: 5,
    title: "The Data Engineering Podcast",
    creator: "Tobias Macey",
    type: "podcast",
    link: "https://www.dataengineeringpodcast.com/",
  },
  {
    id: 6,
    title: "The Rise of the Data Engineer",
    creator: "Maxime Beauchemin",
    type: "article",
    link: "https://maximebeauchemin.medium.com/the-rise-of-the-data-engineer-e0c2b06a72e2",
  },
  {
    id: 7,
    title: "Confluent Inc.",
    creator: "Company",
    type: "company",
    link: "https://www.confluent.io/",
  },
  {
    id: 8,
    title: "Ali Arabshahi",
    creator: "Best Friend",
    type: "friend",
    link: "#",
  },
];

const typeIcons: Record<ResourceType, JSX.Element> = {
  book: <BookOpen className="text-sky-500 w-6 h-6 sm:w-7 sm:h-7" />,
  course: <GraduationCap className="text-pink-500 w-6 h-6 sm:w-7 sm:h-7" />,
  video: <Video className="text-sky-500 w-6 h-6 sm:w-7 sm:h-7" />,
  website: <Globe className="text-green-500 w-6 h-6 sm:w-7 sm:h-7" />,
  podcast: <Podcast className="text-purple-500 w-6 h-6 sm:w-7 sm:h-7" />,
  article: <Newspaper className="text-yellow-500 w-6 h-6 sm:w-7 sm:h-7" />,
  company: <Building className="text-orange-500 w-6 h-6 sm:w-7 sm:h-7" />,
  friend: <User className="text-rose-500 w-6 h-6 sm:w-7 sm:h-7" />, // رنگ صورتی-قرمز برای حس دوستانه
};

export default function ResourceList() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 w-full">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-hoboc mb-2">
          منابعی که از آنها آموختم
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          هر خِرَد و دانشی که در این مسیر می‌بینید، از این اساتید گران‌قدر است
          و هر کاستی و خطایی، تنها از من است{" "}
          <Heart className="inline-block text-red-500 fill-red-500 w-5 h-5 sm:w-6 sm:h-6" />
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
            className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm p-4 flex items-center hover:shadow-md hover:bg-gray-100 transition relative min-h-[72px] sm:min-h-[80px]"
          >
            {/* Icon in top-right with safe space */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
              {typeIcons[res.type]}
            </div>

            {/* Centered text */}
            <div className="flex-1 text-center pr-8 sm:pr-10">
              <h3 className="text-sm sm:text-base md:text-base font-medium text-gray-800">
                {res.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">{res.creator}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
