/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: ['./client/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
