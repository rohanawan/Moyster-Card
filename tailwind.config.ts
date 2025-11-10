import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Ensure common utility classes are always included
    "p-4",
    "p-5",
    "p-6",
    "p-8",
    "m-4",
    "m-5",
    "m-6",
    "m-8",
    "mb-4",
    "mb-5",
    "mb-6",
    "mt-4",
    "mt-5",
    "mt-6",
    "gap-2",
    "gap-3",
    "gap-4",
    "gap-6",
    "gap-8",
    "rounded-xl",
    "rounded-2xl",
    "rounded-3xl",
    "bg-gray-800",
    "bg-gray-900",
    "border-gray-600",
    "border-gray-700",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        spin: "spin 1s linear infinite",
        bounce: "bounce 1s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      spacing: {
        "15": "3.75rem",
        "30": "7.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
