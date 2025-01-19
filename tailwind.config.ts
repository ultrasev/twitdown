import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        courier: ["Courier", "Courier New", "monospace"],
      },
      animation: {
        "dot-1": "dot 1s infinite",
        "dot-2": "dot 1s infinite 0.2s",
        "dot-3": "dot 1s infinite 0.4s",
      },
      keyframes: {
        dot: {
          "0%": { opacity: "0.2" },
          "20%": { opacity: "1" },
          "100%": { opacity: "0.2" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
