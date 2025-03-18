/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors:{
          customGrey: {
            DEFAULT: "rgb(0, 0, 255)", // Blue
          },
        },
      },
    },
    plugins: [],
  };