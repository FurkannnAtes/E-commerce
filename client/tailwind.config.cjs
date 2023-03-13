/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainRed: "rgb(234,34,47)",
        lightGray: "#F5F5F5",
        mainDark: "rgb(37,46,65)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
