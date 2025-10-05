import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import localFont from "next/font/local";
import Alert from "./components/alert/Alert";
import ClientDowntimeWrapper from "./components/alert/no_backend/ClientDowntimeWrapper";

/** Load Vazir font from local files */
const vazir = localFont({
  src: [
    {
      path: "../public/fonts/vazirmatn/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/vazirmatn/Vazirmatn-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-vazir",
});

/** Application metadata */
export const metadata: Metadata = {
  title: "هوبوک | از مهندسی داده تا هوش مصنوعی - آموزش و اجرای پروژه",
  description:
    "هوبوک؛ آموزش خودمونی و تخصصی مهندسی داده، تحلیل داده و هوش مصنوعی. از ساخت پایپ‌لاین‌های داده تا اجرای پروژه‌های واقعی، تبدیل داده خام به تصمیم‌های هوشمند و ارزش‌های واقعی.",
  keywords: [
    "مهندسی داده",
    "آموزش مهندسی داده",
    "هوش مصنوعی",
    "آموزش هوش مصنوعی",
    "تحلیل داده",
    "داده‌کاوی",
    "آموزش داده‌کاوی",
    "پایپ‌لاین داده",
    "Data Pipeline",
    "Data Engineering",
    "Artificial Intelligence",
    "Data Mining",
    "Machine Learning",
    "یادگیری ماشین",
    "Big Data",
    "بیگ دیتا",
    "پایتون",
    "Python",
    "SQL",
    "NoSQL",
    "آپاچی اسپارک",
    "Apache Spark",
    "Apache Kafka",
    "کافکا",
    "ClickHouse",
    "کلیک هاوس",
    "Snowflake",
    "دیتابریکس",
    "Databricks",
    "Airflow",
    "آپاچی ایرفلو",
    "ETL",
    "ELT",
    "آموزش تحلیل داده",
    "Data Warehouse",
    "انبار داده",
    "Stream Processing",
    "پردازش لحظه ای داده",
    "Batch Processing",
    "تحلیل بلادرنگ",
    "آموزش برنامه‌نویسی",
    "پروژه‌های داده",
    "آموزش رایگان دیتا",
    "پروژه واقعی مهندسی داده"
  ].join(","),
  authors: [{ name: "تیم هوبوک" }],
  creator: "علی عربشاهی",
  publisher: "هوبوک",
  category: "Education, Data Engineering, Artificial Intelligence, Data Projects, Consulting",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  metadataBase: new URL("https://hoboc.ir"),

  alternates: { canonical: "https://hoboc.ir" },

  openGraph: {
    title: "هوبوک | از مهندسی داده تا هوش مصنوعی - آموزش و اجرای پروژه",
    description:
      "هوبوک؛ آموزش خودمونی و تخصصی مهندسی داده، تحلیل داده و هوش مصنوعی. از ساخت پایپ‌لاین‌های داده تا اجرای پروژه‌های واقعی، تبدیل داده خام به تصمیم‌های هوشمند و ارزش‌های واقعی.",
    url: "https://hoboc.ir",
    siteName: "هوبوک",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "https://hoboc.ir/images/logo-social.png",
        width: 1200,
        height: 630,
        alt: "هوبوک - آموزش مهندسی داده و هوش مصنوعی",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/** Root layout containing global structure, styling, and providers */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <head>
        {/* JSON-LD Schema for Hoboc */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["EducationalOrganization", "ProfessionalService"],
              name: "هوبوک",
              url: "https://hoboc.ir",
              logo: "https://hoboc.ir/images/logo-square.png", 
              description:
                "هوبوک؛ آموزش خودمونی و تخصصی مهندسی داده، تحلیل داده و هوش مصنوعی...",
              sameAs: [
                "https://www.linkedin.com/in/mraliarabshahi",
                "https://github.com/aliarabshahi/"
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+98-919-0088190",
                  contactType: "customer service",
                  areaServed: "IR"
                }
              ]
            }),
          }}
        />
      </head>
      <body className={`${vazir.className} bg-main-bg min-h-screen`}>
        <Navbar />
        <ClientDowntimeWrapper>{children}</ClientDowntimeWrapper>
        <Footer />
      </body>
    </html>
  );
}
