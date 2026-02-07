/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00A3E0",
        secondary: "#FDB913",
        accent: "#00B140",
      },
    },
  },
  plugins: [],
};
