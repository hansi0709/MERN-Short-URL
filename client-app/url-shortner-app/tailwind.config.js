/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      backgroundImage:{
        banner:"url('./src/assets/dancing.jpg')",
      }
    },
  },
  plugins: [],
}

