import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF7F2",
        tangerine: {
          DEFAULT: "#F47738",
          50: "#FEF4EE",
          100: "#FDE6D7",
          200: "#FAC9AE",
          300: "#F6A57B",
          400: "#F47738",
          500: "#E85F1C",
          600: "#C94A12",
          700: "#A03A12",
          800: "#7C2F13",
          900: "#642812",
        },
        charcoal: {
          DEFAULT: "#252724",
          50: "#F5F6F5",
          100: "#E6E7E5",
          200: "#C9CCC8",
          300: "#A3A7A1",
          400: "#7A7F78",
          500: "#5C615A",
          600: "#454944",
          700: "#353834",
          800: "#252724",
          900: "#181A17",
        },
        turquoise: {
          DEFAULT: "#3E9691",
          50: "#EFF7F6",
          100: "#D6EDEB",
          200: "#AFDCD8",
          300: "#7FC4BF",
          400: "#3E9691",
          500: "#337C78",
          600: "#2A6561",
          700: "#235250",
          800: "#1D4341",
          900: "#183837",
        },
        beige: "#EDE4D8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(37,39,36,0.04), 0 8px 24px -12px rgba(37,39,36,0.16)",
        lift: "0 2px 4px rgba(37,39,36,0.05), 0 24px 48px -20px rgba(37,39,36,0.24)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
