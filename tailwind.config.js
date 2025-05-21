/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF2020',
        'primary-dark': '#CC1A1A',
        'primary-light': '#FF4D4D',
      },
      boxShadow: {
        glow: '0 0 15px rgba(255, 32, 32, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  safelist: [
    // Colors that were causing errors
    'text-white',
    'text-green-500',
    'text-red-500',
    'bg-green-100',
    'bg-yellow-100',
    'bg-red-100',
    'text-green-800',
    'text-yellow-800',
    'text-red-800',
    'rounded-xl',
    'rounded-full'
  ],
  plugins: [],
} 