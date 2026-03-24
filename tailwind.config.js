/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#E8EFF8',
          100: '#C5D3EC',
          400: '#2456A4',
          600: '#1B3D6E',
          800: '#0B2545',
          900: '#071830',
        },
        brand: {
          blue:  '#1A6BF5',
          green: '#059669',
          gold:  '#D97706',
        }
      },
      fontFamily: {
        head: ['Sora', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 16px rgba(11,37,69,.09), 0 2px 6px rgba(11,37,69,.06)',
        xl:   '0 20px 60px rgba(11,37,69,.15)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.5rem',
      }
    },
  },
  plugins: [],
}
