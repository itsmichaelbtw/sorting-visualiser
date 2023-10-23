import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{ts,tsx}",
    "./containers/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
    "./css/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./public/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
    "./index.tsx",
    "**/*.html"
  ],
  darkMode: "class"
} satisfies Config;
