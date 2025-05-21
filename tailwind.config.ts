import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vectorRed: "#FF2020",
        vectorRedLight: "rgba(255, 32, 32, 0.1)",
        vectorRedDark: "#D61212",
        black: "#000000",
        white: "#FFFFFF",
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
      boxShadow: {
        'neon': '0 0 5px rgba(255, 32, 32, 0.5), 0 0 15px rgba(255, 32, 32, 0.3)',
        'neon-sm': '0 0 3px rgba(255, 32, 32, 0.5), 0 0 8px rgba(255, 32, 32, 0.3)',
        'neon-lg': '0 0 10px rgba(255, 32, 32, 0.6), 0 0 20px rgba(255, 32, 32, 0.4), 0 0 30px rgba(255, 32, 32, 0.2)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 32, 32, 0.5), 0 0 15px rgba(255, 32, 32, 0.3)' },
          '50%': { boxShadow: '0 0 8px rgba(255, 32, 32, 0.7), 0 0 20px rgba(255, 32, 32, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      padding: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
      },
    },
  },
  plugins: [],
}

export default config; 