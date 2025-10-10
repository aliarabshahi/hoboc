"use client";

import { useEffect, useState } from "react";
import { Roadmap } from "./components/Rodmap";
import RoadmapImage from "./components/RoadmapImage";
import { getApiData } from "../services/receive_data/apiServerFetch";
import { RoadmapItem as RoadmapItemType } from "@/app/types/roadmapType";

/** Placeholder skeleton displayed while roadmap content loads */
function RoadmapSkeleton() {
  return (
    <div className="w-full h-[500px] bg-[#E9D7EB]/30 rounded-xl animate-pulse" />
  );
}

/** Roadmap page with sticky image & consistent layout */
export default function RoadmapPage() {
  const [roadmapData, setRoadmapData] = useState<RoadmapItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getApiData("/roadmap-items/");
      setError(error || null);
      setRoadmapData(data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBFD] py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Sticky Image */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 lg:sticky lg:top-0 self-start">
            <RoadmapImage />
          </div>

          {/* Content (Form-style) */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            {loading ? (
              <RoadmapSkeleton />
            ) : error ? (
              <p className="text-red-600 text-center font-medium">{error}</p>
            ) : roadmapData.length === 0 ? (
              <p className="text-center text-gray-500">
                نقشه راهی برای نمایش وجود ندارد!
              </p>
            ) : (
              <Roadmap
                title="نقشه راه جامع مهندسی داده"
                description="مسیر یادگیری برای تبدیل شدن به مهندس داده حرفه‌ای"
                roadmapData={roadmapData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// real sample roadmap:

// {
//     id: '1',
//     title: 'مفاهیم مقدماتی از مهندسی داده',
//     description: 'آشنایی با اصول اولیه مهندسی داده و معماری سیستم‌های داده',
//     level: 'مبتدی',
//     status: 'تکمیل شده',
//     resources: [
//       { title: 'مقاله مهندسی داده چیست؟', url: '#' },
//       { title: 'معماری سیستم‌های داده', url: '#' }
//     ]
//   },
//   {
//     id: '2',
//     title: 'داکر، آشنایی و کار با کانتینرها',
//     description: 'یادگیری مفاهیم کانتینریزاسیون و پیاده‌سازی با داکر',
//     level: 'مبتدی',
//     status: 'در حال یادگیری',
//     resources: [
//       { title: 'داکر از صفر تا صد', url: '#' },
//       { title: 'Docker Documentation', url: '#' }
//     ]
//   },
//     {
//       id: '3',
//       title: 'لینوکس و خط فرمان شگفت‌انگیز آن',
//       description: 'کار با ترمینال لینوکس و دستورات اساسی',
//       level: 'مبتدی',
//       status: 'شروع‌نشده'
//     },
//     {
//       id: '4',
//       title: 'انجام یک پروژه‌ی ETL ساده با کرون‌جابزها',
//       description: 'پیاده‌سازی یک پروژه استخراج، تبدیل و بارگذاری داده',
//       level: 'متوسط',
//       status: 'شروع‌نشده'
//     },
//     {
//       id: '5',
//       title: 'آپاچی ایرفلو، یک سیستم مدیریت جریان داده',
//       description: 'یادگیری اورکستراسیون جریان‌های داده با Airflow',
//       level: 'متوسط',
//       status: 'شروع‌نشده'
//     },
//     {
//       id: '6',
//       title: 'آشنایی و کار عملی با الستیک و کیبانا',
//       description: 'جستجو و تجسم داده‌ها با Elasticsearch و Kibana',
//       level: 'متوسط',
//       status: 'شروع‌نشده'
//     },
//     {
//       id: '7',
//       title: 'گیت برای مدیریت ورژن کدها',
//       description: 'یادگیری سیستم کنترل نسخه Git',
//       level: 'مبتدی',
//       status: 'شروع‌نشده'
//     },
//     {
//       id: '8',
//       title: 'آشنایی و کار عملی با گیت‌هاب اکشنز',
//       description: 'اتوماسیون فرآیندها با GitHub Actions',
//       level: 'متوسط',
//       status: 'شروع‌نشده'
//     },
//     {
//       id: '9',
//       title: 'پوستگرس، پیشرفته‌ترین دیتابیس رایگان دنیا',
//       description: 'کار با PostgreSQL و ویژگی‌های پیشرفته آن',
//       level: 'متوسط',
//       status: 'شروع‌نشده'
//     },
//     {
//       id: '10',
//       title: 'آشنایی و کار با کلیک‌هاوس',
//       description: 'پردازش تحلیلی آنلاین با ClickHouse',
//       level: 'پیشرفته',
//       status: 'شروع‌نشده'
//     },
//     {
//       id: '11',
//       title: 'آپاچی کافکا، غولی در دنیای پردازش داده‌های استریم',
//       description: 'کار با سیستم پیام‌رسانی توزیع‌شده Kafka',
//       level: 'پیشرفته',
//       status: 'شروع‌نشده'
//     },
//     {
//       id: '12',
//       title: 'آپاچی فلینک، یکی از بهترین گزینه‌ها در دنیای پردازش استریم',
//       description: 'پردازش جریان‌های داده با Apache Flink',
//       level: 'پیشرفته',
//       status: 'شروع‌نشده'
//     },
//     {
//       id: '13',
//       title: 'آپاچی اسپارک، سرعت و قدرت همزمان در پردازش داده',
//       description: 'پردازش توزیع‌شده داده‌ها با Apache Spark',
//       level: 'پیشرفته',
//       status: 'شروع‌نشده'
//     },
//     {
//       id: '14',
//       title: 'طراحی و پیاده‌سازی یک دیتالیک‌هوز با دلتالیک',
//       description: 'مدیریت دریاچه داده با Delta Lake',
//       level: 'پیشرفته',
//       status: 'شروع‌نشده'
//     },
//     {
//       id: '15',
//       title: 'رایانش ابری برای مهندسی داده با آروان‌کلاد',
//       description: 'پیاده‌سازی راهکارهای ابری ایرانی',
//       level: 'متوسط',
//       status: 'شروع‌نشده'
//     },
//     {
//       id: '16',
//       title: 'رایانش ابری برای مهندسی داده با آمازون',
//       description: 'کار با سرویس‌های AWS برای مهندسی داده',
//       level: 'پیشرفته',
//       status: 'شروع‌نشده'
//     },
//     {
//       id: '17',
//       title: 'کوبرنتیز، بهترین سیستم مدیریت کانتینرها',
//       description: 'اورکستراسیون کانتینرها با Kubernetes',
//       level: 'پیشرفته',
//       status: 'شروع‌نشده'
//     }
