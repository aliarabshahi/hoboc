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
  title: "هوبوک | آموزش مهندسی داده، داده‌کاوی و هوش مصنوعی",
  description:
    "آموزش تخصصی مهندسی داده، هوش مصنوعی و داده‌کاوی از پایه تا پیشرفته. تبدیل داده‌های خام به بینش‌های ارزشمند و کسب مهارت‌های مورد نیاز صنعت با متدهای روز دنیا",
  keywords: [
    "مهندسی داده",
    "هوش مصنوعی",
    "داده‌کاوی",
    "آموزش داده",
    "دیتا ساینس",
    "Data Engineering",
    "Artificial Intelligence",
    "Data Mining",
    "آموزش برنامه‌نویسی",
    "تحلیل داده",
    "یادگیری ماشین",
    "Machine Learning",
    "بیگ دیتا",
    "Big Data",
    "پایتون",
    "Python",
    "SQL",
    "Apache Spark",
    "Apache Kafka",
    "Data Pipeline",
  ].join(","),
  authors: [{ name: "تیم هوبوک" }],
  creator: "علی عربشاهی",
  publisher: "هوبوک",
  category: "education",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  metadataBase: new URL("https://hoboc.ir"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "هوبوک | آموزش مهندسی داده و هوش مصنوعی",
    description:
      "یادگیری مهندسی داده، داده‌کاوی و هوش مصنوعی از پایه تا پیشرفته",
    url: "https://hoboc.ir",
    siteName: "هوبوک",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
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
      <body className={`${vazir.className} bg-main-bg min-h-screen`}>
        {/* <Alert /> — enable for global announcements */}
        <Navbar />
        <ClientDowntimeWrapper>{children}</ClientDowntimeWrapper>
        <Footer />
      </body>
    </html>
  );
}