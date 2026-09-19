import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#20221f',
        coal: '#2b2c29',
        shell: '#cdd0cb',
        sand: '#b8bbb5',
        stone: '#9ea19b',
        champagne: '#9f927f',
        sage: '#8d9483',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Iowan Old Style', 'Baskerville', 'Georgia', 'serif'],
      },
      letterSpacing: {
        architectural: '0.12em',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(32,34,31,.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
