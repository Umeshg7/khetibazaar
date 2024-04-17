/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

        colors : {

          "green" : "#71C247",
          "red" : "#FF6868",
          "brown" : "#4A141B",
          "secondary" : "#555",
          "primaryBG" : "#FCFCFC"
        },
        fontFamily : {
          "primary" : ['Inter', 'sans-serif']
        }

    },
  },
  plugins: [require("daisyui")],
}

