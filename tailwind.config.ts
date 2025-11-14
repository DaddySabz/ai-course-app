import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          DEFAULT: "#2563EB", // Blue 600
          "light": "#3B82F6", // Blue 500
          "dark": "#1D4ED8" // Blue 700
        },
        "accent-yellow": "#FBBF24", // amber-400
        "accent-teal": "#2DD4BF", // teal-400
        "background-light": "#F0F9FF", // sky-50
        "background-dark": "#0B1120",
        "surface": "#ffffff",
        "text-primary": "#0F172A", // slate-900
        "text-secondary": "#64748B", // slate-500
        "text-tertiary": "#94A3B8", // slate-400
        "border-color": "#E2E8F0" // slate-200
      },
      fontFamily: {
        "display": ["Roboto Flex", "sans-serif"],
        "body": ["Inter", "sans-serif"]
      },
    },
  },
  plugins: [],
};
export default config;
