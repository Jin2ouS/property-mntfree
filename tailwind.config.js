/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f1729',
          light: '#1e293b',
          mid: '#334155',
        },
        warmgray: {
          DEFAULT: '#64748b',
          light: '#94a3b8',
          muted: '#475569',
        },
        amber: {
          accent: '#d97706',
          hover: '#b45309',
          muted: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
