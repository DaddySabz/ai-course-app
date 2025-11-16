import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       colors: {
        "primary": {
          DEFAULT: "#2563EB",
          "light": "#3B82F6",
          "dark": "#1D4ED8" 
        },
        "accent-yellow": "#FBBF24",
        "accent-teal": "#2DD4BF",
        "background-light": "#F0F9FF",
        "surface": "#ffffff",
        "text-primary": "#0F172A",
        "text-secondary": "#64748B",
      },
    },
  },
  plugins: [],
};
export default config;
