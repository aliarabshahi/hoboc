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
  User,
} from "lucide-react";

type ResourceType =
  | "book"
  | "website"
  | "video"
  | "course"
  | "podcast"
  | "article"
  | "company"
  | "friend";

interface Resource {
  id: number;
  title: string;
  creator: string;
  type: ResourceType;
  link: string;
}

/** آیکون‌های هماهنگ با پالت برند HOBOC */
const typeIcons: Record<ResourceType, JSX.Element> = {
  book: <BookOpen className="text-[#1F9ECE] w-6 h-6" />,
  course: <GraduationCap className="text-[#8DA9C4] w-6 h-6" />,
  video: <Video className="text-[#5C6F82] w-6 h-6" />,
  website: <Globe className="text-[#A2BAD2] w-6 h-6" />,
  podcast: <Podcast className="text-[#E9D7EB] w-6 h-6" />,
  article: <Newspaper className="text-[#5C6F82] w-6 h-6" />,
  company: <Building className="text-[#1F9ECE] w-6 h-6" />,
  friend: <User className="text-[#E48F9A] w-6 h-6" />,
};

export default function ResourceList({ resources }: { resources: Resource[] }) {
  if (!resources || resources.length === 0) {
    return <p className="text-center text-[#5C6F82]">هیچ منبعی موجود نیست.</p>;
  }

  return (
    <div className="bg-white/70 backdrop-blur-md p-5 sm:p-7 rounded-xl shadow-[0_2px_10px_rgba(31,158,206,0.07)] w-full">
      <div className="mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F9ECE] mb-2">
          منابعی که از آنها آموختم
        </h2>
        <p className="text-[#393939]/80 text-sm sm:text-base leading-relaxed">
          هر خِرَد و دانشی که در این مسیر هست از این اساتید گران‌قدر است؛
          هر کاستی یا خطا، از من است{" "}
          <Heart className="inline-block text-rose-400 fill-rose-400 w-4 h-4 sm:w-5 sm:h-5 ml-1" />
        </p>
      </div>

      <div className="space-y-4">
        {resources.map((res) => (
          <a
            key={res.id}
            href={res.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center 
                       bg-white/80 backdrop-blur-md rounded-xl 
                       shadow-[0_2px_10px_rgba(31,158,206,0.07)] 
                       border border-[#1F9ECE]/15 
                       p-4 sm:p-5 min-h-[64px] sm:min-h-[72px] md:min-h-[80px]"
          >
            <div className="absolute top-3 right-3">
              {typeIcons[res.type]}
            </div>

            <div className="flex-1 text-center pr-10">
              <h3 className="text-sm sm:text-base font-medium text-[#393939]">
                {res.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6F82] mt-0.5">
                {res.creator}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
