/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFBA33",
        secondary: "#6A4029",
        backaccent: "#F8F8F8",
        secondaryhover: "#895537",
        grey: "#9F9F9F",
        greydark: "#4F5665",
        green: "#48BB78",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        popins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
