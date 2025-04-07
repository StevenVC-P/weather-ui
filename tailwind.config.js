/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/dashboard/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    // Color variants for our cards
    "bg-amber-50",
    "bg-amber-100",
    "bg-teal-50",
    "bg-teal-100",
    "bg-emerald-50",
    "bg-emerald-100",
    "border-amber-300",
    "border-amber-800",
    "border-teal-300",
    "border-teal-800",
    "border-emerald-300",
    "border-emerald-800",
    "text-amber-700",
    "text-amber-400",
    "text-teal-700",
    "text-teal-400",
    "text-emerald-700",
    "text-emerald-400",
    "dark:bg-stone-800",
    "dark:bg-stone-900",
    "dark:border-amber-800",
    "dark:border-teal-800",
    "dark:border-emerald-800",
    "dark:text-amber-400",
    "dark:text-teal-400",
    "dark:text-emerald-400",

    // Status indicators
    "bg-amber-700",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-teal-500",

    // Hover states
    "hover:shadow-xl",
  ],
  theme: {
    extend: {
      colors: {
        rustic: {
          terracotta: "#a45e4d",
          wheat: "#d6a97d",
          sage: "#84a98c",
          teal: "#5f8d83",
          stone: {
            50: "#f5f5f4",
            100: "#e7e5e4",
            200: "#d6d3d1",
            300: "#a8a29e",
            400: "#78716c",
            500: "#57534e",
            600: "#44403c",
            700: "#292524",
            800: "#1c1917",
            900: "#0c0a09",
          },
        },
        amber: {
          200: "#fde68a",
          500: "#f59e0b",
          700: "#b45309",
          900: "#78350f",
        },
      },
      fontFamily: {
        serif: ["Merriweather", "Georgia", "serif"],
      },
      boxShadow: {
        rustic: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "rustic-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
