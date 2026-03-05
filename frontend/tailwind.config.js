/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        yblue: {
          DEFAULT: '#002340',
          light:   '#003a6b',
          dark:    '#001529',
        },
        ygreen: {
          DEFAULT: '#B4FF00',
          light:   '#c8ff3d',
          dark:    '#8acc00',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
