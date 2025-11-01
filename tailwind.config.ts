import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        "vfgl-dark": "#111111",
        "vfgl-primary": "#1A1A1A",
        "vfgl-secondary": "#808080",
        "vfgl-border": "#EAEAEA",
        "vfgl-bg-light": "#FAFAFA",
        "vfgl-bg-dark": "#F5F5F5",
        "vfgl-star": "#FFC107",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
export default config;
