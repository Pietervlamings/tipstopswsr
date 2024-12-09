/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        woonstad: {
          green: '#00B089',
          'green-light': '#E6F5F1',
          'green-dark': '#009874',
          gray: '#F7F7F7',
          text: '#333333'
        }
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}