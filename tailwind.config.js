/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        amatic: ['Amatic SC', 'cursive'],
      },
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}

