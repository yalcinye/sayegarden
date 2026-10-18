/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFFFF',
        sand: '#F4F6F4',
        mint: '#D4EDDA',
        moss: { DEFAULT: '#2E765E', dark: '#265126', light: '#5B9A7F' },
        clay: { DEFAULT: '#2E765E', dark: '#265126' },
        star: '#F5A623',
        ink: '#1C1C1C',
      },
      fontFamily: {
        serif: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: { marquee: 'marquee 35s linear infinite' },
    },
  },
  plugins: [],
}
