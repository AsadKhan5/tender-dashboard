/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "corporate",
      "black",
      // {
      //   mytheme: {
      //     primary: "#2a3860",
      //     secondary: "#6c9839",
      //     accent: "#37cdbe",
      //     neutral: "#3d4451",
      //     "base-100": "#ffffff",
      //   },
      // },
      // {
      //   dark: {
      //     primary: "#2a3860",
      //     secondary: "#6c9839",
      //     accent: "#37cdbe",
      //     neutral: "#3d4451",
      //     "base-100": "#242937",
      //   },
      // },
    ],
  },
};
