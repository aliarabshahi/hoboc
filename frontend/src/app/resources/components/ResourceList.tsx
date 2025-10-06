"use client";

import { useEffect, useState } from "react";
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
import { getApiData } from "@/app/services/receive_data/apiServerFetch";

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

// آیکون‌ها با سایز واکنش‌گرا
const typeIcons: Record<ResourceType, JSX.Element> = {
  book: <BookOpen className="text-sky-500 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
  course: <GraduationCap className="text-pink-500 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
  video: <Video className="text-sky-500 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
  website: <Globe className="text-green-500 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
  podcast: <Podcast className="text-purple-500 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
  article: <Newspaper className="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
  company: <Building className="text-orange-500 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
  friend: <User className="text-rose-500 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
};

export default function ResourceList() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      const { data, error } = await getApiData("/resource-items/");
      if (error) setError(error);
      else setResources(data || []);
      setLoading(false);
    };
    fetchResources();
  }, []);

  if (loading) return <p className="text-center">در حال بارگذاری...</p>;
  if (error) return <p className="text-center text-red-600">خطا: {error}</p>;
  if (resources.length === 0)
    return <p className="text-center text-gray-500">هیچ منبعی موجود نیست.</p>;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 w-full">
      {/* عنوان بخش */}
      <div className="mb-8 text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-hoboc mb-2">
          منابعی که از آنها آموختم
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base">
          هر خِرَد و دانشی که در این مسیر می‌بینید، از این اساتید گران‌قدر است
          و هر کاستی و خطایی، تنها از من است{" "}
          <Heart className="inline-block text-red-500 fill-red-500 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-1" />
        </p>
      </div>

      {/* لیست منابع */}
      <div className="space-y-4">
        {resources.map((res) => (
          <a
            key={res.id}
            href={res.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm p-3 sm:p-4 flex items-center hover:shadow-md hover:bg-gray-100 transition relative min-h-[64px] sm:min-h-[72px] md:min-h-[80px]"
          >
            {/* آیکون بالا-راست */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4">
              {typeIcons[res.type]}
            </div>

            {/* متن وسط‌چین */}
            <div className="flex-1 text-center pr-8 sm:pr-10">
              <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-800">
                {res.title}
              </h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">
                {res.creator}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
