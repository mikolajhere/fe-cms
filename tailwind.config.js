/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    letterSpacing: {
      tight: "-.015em",
      wide: "2px"
    },
    extend: {
      height: {
        "half-screen": "50vh",
      },
    },
  },
  plugins: [],
};
