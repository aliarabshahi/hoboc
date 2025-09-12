// app/components/inspire/InspiringQuoteBackground.tsx
"use client";

/** Decorative background for InspiringQuote: dark overlay + blurred gradient blob */
export default function InspiringQuoteBackground() {
  return (
    <>
      {/* Semi-transparent dark overlay */}
      <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />

      {/* Gradient blob shape */}
      <div
        aria-hidden="true"
        className="absolute -left-80 -top-56 transform-gpu blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r 
                     from-[#ff4694] to-[#776fff] opacity-[0.45]"
        />
      </div>
    </>
  );
}
