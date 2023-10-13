/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pastelGreen: {
          50: '#f1fcf2',
          100: '#dff9e4',
          200: '#c0f2c9',
          300: '#74e18a',
          400: '#56d26f',
          500: '#2fb84b',
          600: '#21983a',
          700: '#1d7830',
          800: '#1c5f2b',
          900: '#194e26',
          950: '#082b11',
        },
      },
    },
  },
  plugins: [],
};
