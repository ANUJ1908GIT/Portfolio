import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
        display: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        blue: {
          400: "#60a5fa",
          500: "#3b82f6",
          950: "#172554",
        },
        purple: {
          400: "#c084fc",
          500: "#a78bfa",
          700: "#7c3aed",
          950: "#2e1065",
        },
        cyan: {
          400: "#22d3ee",
          950: "#083344",
        },
      },
      animation: {
        "aurora-drift": "auroraDrift 20s ease-in-out infinite",
        "orbit-spin": "orbitSpin 12s linear infinite",
        "scroll-pulse": "scrollPulse 2.5s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
