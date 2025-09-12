import Hero from "./components/hero/Hero";
import Vision from "./components/vision/Vision";
import CoursesDetailWrapper from "./components/courses/courses_detail/CoursesDetailWrapper";
import LatestBlogs from "./components/latest-blogs/LatestBlogs";
import LatestLessons from "./components/last-lessons/LatestLessons";
import InspiringQuote from "./components/inspire/InspiringQuote";
import FinalWord from "./components/final-word/FinalWord";
import BackgroundWithPattern from "./components/BackgroundWithPattern";

export default function Home() {
  return (
    <main className="">
      {/* Main hero section */}
      <Hero />

      {/* Vision section with container padding */}
      <section className="container mx-auto px-4 md:px-8 lg:px-16" dir="rtl">
        <Vision />
      </section>

      {/* Latest Lessons section with patterned background */}
      <section
        className="relative container mx-auto px-4 md:px-8 lg:px-20"
        dir="rtl"
      >
        {/* Background pattern */}
        <div className="absolute inset-0">
          <BackgroundWithPattern />
        </div>

        {/* Lessons content */}
        <LatestLessons />
      </section>

      {/* Inspiring Quote section  */}
      <section className="my-20 container mx-auto px-4 md:px-8 lg:px-20">
        <InspiringQuote />
      </section>

      {/* Courses detail section (currently commented out) */}
      {/* <CoursesDetailWrapper /> */}

      {/* Latest blog posts section */}
      <section className="container mx-auto px-4 md:px-8 lg:px-20" dir="rtl">
        <LatestBlogs />
      </section>

      {/* FinalWord section */}
      <FinalWord />
    </main>
  );
}