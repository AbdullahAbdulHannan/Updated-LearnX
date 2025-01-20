const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
    colors:{
         myBlue:'rgba(8, 14, 44,1)'
    }
  },
  plugins: [
    flowbite.plugin(),
  ],
}

