/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bw: {
          bg: '#1a1108',
          surface: '#231a0d',
          surface2: '#2e2210',
          gold: '#e8a228',
          goldlight: '#f0c060',
          green: '#5a8a3c',
          red: '#c0392b',
          text: '#f5efe6',
          muted: '#a89070',
          border: '#3d2e1a',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
