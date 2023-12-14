/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-bg': '#1eb854', 
      },
      backgroundImage: {
        'background': "url('src/assets/images/skull.jpg')",
      },
      colors: {
        black: '#171212',
        green: '#1eb854', 
        white: '#F5F5F5'
      },
    },
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin'),
  ],
}

