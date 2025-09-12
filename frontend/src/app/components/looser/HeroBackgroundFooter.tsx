// app/components/hero/HeroBackgroundFooter.tsx
"use client";

/** Hero bottom section with title, description, CTA, and decorative background */
export default function HeroBackgroundFooter() {
  return (
    <div className="relative bg-white z-0 overflow-hidden" dir="rtl">
      {/* Content wrapper */}
      <div className="relative isolate px-6 pt-8 pb-8 sm:pt-12 sm:pb-10 md:pt-14 md:pb-12 lg:pt-24 lg:pb-14">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          {/* Main heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 leading-snug sm:text-5xl pr-8">
            <span className="text-hoboc-dark">داده‌ها</span> زندگی می‌کنند!
          </h1>

          {/* Supporting paragraph */}
          <p className="text-base font-medium text-gray-600 sm:text-lg leading-relaxed pr-4">
            در دنیای امروز، داده‌ها نفس می‌کشند و داستان‌ها می‌گویند. ما به شما یاد می‌دهیم 
            چگونه این داستان‌ها را بخوانید و از آنها زندگی‌های بهتری بسازید.
            <br />
            مهندسی داده تنها یک شغل نیست، یک هنر است!
          </p>

          {/* Call-to-action button */}
          <div className="pt-4">
            <a
              href="/contact"
              className="rounded-md bg-hoboc px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-hoboc-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hoboc-dark transition-colors"
            >
              تماس با ما
            </a>
          </div>
        </div>
      </div>

      {/* Decorative background blob at bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-20 -z-10 transform-gpu overflow-hidden blur-3xl pointer-events-none sm:-bottom-28"
      >
        <div
          className="relative right-[calc(50%-rem)] aspect-[1400/678] w-[50rem] translate-x-1/2 rotate-[20deg] 
          bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 
          sm:right-[calc(50%-30rem)] sm:w-[80rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
