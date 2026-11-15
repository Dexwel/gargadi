import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B2A3A",
        river: { DEFAULT: "#0E5E7E", dark: "#0A4660", light: "#E6F2F7" },
        sun: { DEFAULT: "#F2A93B", dark: "#8A5A00", light: "#FDF1DA" },
        leaf: { DEFAULT: "#2F7D4F", dark: "#246B42", light: "#E5F3EA" },
        clay: { DEFAULT: "#C2410C", dark: "#A8370A", light: "#FDE9DD" },
        sand: "#FAF7F2",
        mist: "#5B6F7B",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "16px" },
    },
  },
  plugins: [],
};
export default config;
