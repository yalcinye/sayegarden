/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F6F1E7',
        sand: '#EADFCB',
        moss: { DEFAULT: '#2F4A35', dark: '#1F3324', light: '#5B7A5F' },
        clay: { DEFAULT: '#C2683F', dark: '#A4532E' },
        ink: '#1C1F1A',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
