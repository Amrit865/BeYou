/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atelier: {
          ivory: '#FAF8F5',
          cream: '#F4EFE6',
          beige: '#E8DFD3',
          sand: '#D5C7B5',
          taupe: '#7D756C',
          charcoal: '#1C1917',
          gold: '#C5A880',
          accent: '#A07855'
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
