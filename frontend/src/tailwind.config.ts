import type { Config } from "tailwindcss";

/** TailwindCSS configuration for custom theme colors, z-index levels, and plugins */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hoboc: "#1F9ECE",
        "hoboc-dark": "#0076A6",
        "custom-blue-for-hero-bg": "#EFFAFD",
        "main-bg-courses": "#F5F8FA",
        "main-bg": "#FEFEFE",
      },
      zIndex: {
        60: "60",
        70: "70",
        999: "999",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
