import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { fontFamily: { sans: ["Arial", "sans-serif"] }, colors: { market: "#16784b", ink: "#17251d", cream: "#f7f8f3" } } },
  plugins: []
};
export default config;
