/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        google: {
          "0%": { transform: "translateY(-15px)" },
          "100%": { transform: "translateY(5px)" },
        },
      },
      animation: {
        google: "google 1s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
